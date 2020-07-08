const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const {
    insertRegister,
    getUser,
    insertCode,
    getCode,
    updatePassword,
    getUserImg,
    updateProfilePic,
} = require("./db.js");
const csurf = require("csurf");
const { hash, compare } = require("./bc.js");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses.js");
const s3 = require("./s3.js");
const { s3Url } = require("./config.json");

app.use(compression());
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 24 * 14,
    })
);

////// FILE UPLOAD BOILERPLATE //////
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});
//////////////////////////////////////

app.use(express.static("./public"));
app.use(express.json());

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        /// if the user is logged in...
        res.redirect("/");
    } else {
        /// the user is not logged in
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/password/reset/start", (req, res) => {
    getUser(req.body.email)
        .then((result) => {
            // console.log("----RESULT IN /RESET PASSWORD--");
            // console.log(result.rows.length);
            if (result.rows.length > 0) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                // console.log("-----secretCode-----");
                // console.log(secretCode);
                insertCode(req.body.email, secretCode)
                    .then((result) => {
                        // console.log("----RESULT IN /PASSWORD/RESET/START-----");
                        // console.log(result);
                        sendEmail(
                            req.body.email,
                            "Heres your password reset code",
                            secretCode
                        )
                            .then((result) => {
                                res.json("PLEASE CHECK YOUR EMAIL");
                            })
                            .catch((err) => {
                                console.log("ERROR IN CATCH SEND EMAIL", err);
                            });
                    })
                    .catch((err) => {
                        console.log(
                            "----EROOR IN /PASSWORD/RESET/START----",
                            err
                        );
                    });
            } else {
                res.json({ error: true });
                console.log("add error email don't match");
            }
        })
        .catch((err) => {
            console.log("ERROR IN CATCH /RESET PASSWORD", err);
        });
});

app.post("/password/reset/verify", (req, res) => {
    // console.log("---REQ.BODY VERIFY----");
    // console.log(req.body);
    getCode(req.body.email, req.body.code)
        .then((result) => {
            console.log("----RESULT IN POST /VERIFY----");
            console.log(result);
            if (result.rows.length > 0) {
                hash(req.body.newPassword).then((hashedPw) => {
                    console.log("------HASEDPASSWORD-----");
                    console.log(hashedPw);
                    updatePassword(hashedPw, result.rows[0].id)
                        .then((result) => {
                            console.log(
                                "------RESULT IN /HASE POST RESET-------"
                            );
                            console.log(result);
                            res.json("SUCCESSE UPDATE");
                        })
                        .catch((err) => {
                            console.log(
                                "-----ERROR IN CATCH /RESET/VERIFY POST-----",
                                err
                            );
                        });
                });
            }
        })
        .catch((err) => {
            console.log("ERROR IN CATCH POST /VERIFY", err);
        });
});

app.post("/register", (req, res) => {
    // console.log("------REQ.BODY------");
    // console.log(req.body);
    hash(req.body.password).then((hashedPw) => {
        // console.log("------HASEDPASSWORD-----");
        // console.log(hashedPw);
        insertRegister(req.body.first, req.body.last, req.body.email, hashedPw)
            .then((result) => {
                // console.log("------RESULT IN /REGISTER POST-------");
                // console.log(result);
                req.session.userId = {
                    userId: result.rows[0].id,
                    first: result.rows[0].first,
                    last: result.rows[0].last,
                    email: result.rows[0].email,
                    password: hashedPw,
                };
                res.json(result.rows[0]);
            })
            .catch((err) => {
                console.log("-----ERROR IN CATCH /REGISTER POST-----", err);
            });
    });
});

app.post("/login", (req, res) => {
    getUser(req.body.email)
        .then((result) => {
            // console.log("----RESULT IN POST /LOGIN----");
            // console.log(result);
            if (result.rows.length <= 0) {
                res.redirect("/register");
            } else {
                compare(req.body.password, result.rows[0].password).then(
                    (match) => {
                        // console.log("PASSWORD CORRECT?: ", match);
                        if (match == true) {
                            req.session.userId = result.rows[0].id;
                            // console.log(req.session);
                            if (!result.rows[0]) {
                                res.json("PASSWORD DON'T MATCH");
                            } else {
                                res.json("LOGIN SUCCSSFULL");
                            }
                        } else {
                            res.json("PASSWORD OR EMAIL DOESN'T MATCH");
                        }
                    }
                );
            }
        })
        .catch((err) => {
            console.log("ERROR IN CATCH POST /LOGIN", err);
        });
});

app.get("/user", (req, res) => {
    getUserImg(req.session.userId)
        .then((result) => {
            // console.log("-----RESULT IN /USER-----");
            // console.log(result);
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("ERROR IN /USER", err);
        });
});

// app.get("/user", async (req, res) => {
//     try {
//         await getUserImg(req.session.userId);
//     } catch (e) {
//         console.log("ERROE IN /USER", e);
//     }
//     console.log("-----REQ.SSESION-----");
//     console.log(req.session.userId);
// });

app.post("/upload", uploader.single("imgurl"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const imageUrl = `${s3Url}${filename}`;
    console.log("-----REQ.BODY------");
    console.log(req.body);
    console.log("----FILENAME-----");

    console.log(filename);
    console.log("----s3Url-----");

    console.log(s3Url);

    if (filename) {
        updateProfilePic(imageUrl, req.session.userId)
            .then((result) => {
                // console.log("------RESULT------");
                // console.log(result);
                res.json(result.rows[0]);
            })
            .catch((err) => {
                console.log("----ERROR IN POST /UPLOAD----", err);
            });
    } else {
        console.log("SOMETHING WENT WRONG!");
    }
});

/// LAST ROUTE ///
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
