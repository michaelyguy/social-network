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
    updateBio,
    getOtherProfile,
    getInitialStatus,
    getMatchingUsers,
    getLastUsers,
    addFriendReq,
    updateUsersFriendship,
    deleteFriendship,
    getAllFriends,
} = require("./db.js");
const csurf = require("csurf");
const { hash, compare } = require("./bc.js");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses.js");
const s3 = require("./s3.js");
const { s3Url } = require("./config.json");

//// socket.io ////
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

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
const { LakeFormation } = require("aws-sdk");
const { Socket } = require("dgram");

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
            // console.log("----RESULT IN POST /VERIFY----");
            // console.log(result);
            if (result.rows.length > 0) {
                hash(req.body.newPassword).then((hashedPw) => {
                    // console.log("------HASEDPASSWORD-----");
                    // console.log(hashedPw);
                    updatePassword(hashedPw, result.rows[0].id)
                        .then((result) => {
                            // console.log(
                            //     "------RESULT IN /HASE POST RESET-------"
                            // );
                            // console.log(result);
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
                console.log("------RESULT IN /REGISTER POST-------");
                console.log(result);
                req.session.userId = result.rows[0].id;
                res.json(result.rows[0]);
                console.log("----console.log(req.session.userId);----");
                console.log(req.session.userId);
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
                                res.json({ id: result.rows[0].id });
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

app.get("/api/user/:id", async (req, res) => {
    // console.log("---req.params-----");
    // console.log(req.params);
    try {
        const result = await getOtherProfile(req.params.id);
        // console.log("----RESULT IN /USER:Id-----");
        // console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.log("ERROR IN /USER:ID");
    }
});

app.get("/user", (req, res) => {
    // console.log("----reqsession-----");
    // console.log(req.session);
    getUserImg(req.session.userId)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("ERROR IN /USER", err);
        });
});

app.post("/bio/editor", async (req, res) => {
    console.log("req.body: ", req.body);
    try {
        const result = await updateBio(req.body.bioText, req.session.userId);
        // console.log("----RESULT BIO EDITOR------");
        // console.log(result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.log("ERROR IN BIO/EDITOR");
    }
});

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

app.get("/api/users/:id", async (req, res) => {
    try {
        const result = await getLastUsers();
        res.json(result.rows);
    } catch (err) {
        console.log("ERROR IN /api/users/:id", err);
    }
});

app.get("/api/match/users", async (req, res) => {
    try {
        // console.log("-----req.query in match/user-----");
        // console.log(req.query.name);
        const result = await getMatchingUsers(req.query.name);
        // console.log("----RESULT IN /api/match/users:id-----");
        // console.log(result.rows);
        res.json(result.rows);
    } catch (err) {
        console.log("ERROR IN /api/more/users:id", err);
    }
});

app.get("/get-initial-status/:id", async (req, res) => {
    // console.log("----req.session.userId----");
    // console.log(req.session.userId);
    // console.log("----req.params.id----");
    // console.log(req.params.id);
    try {
        // console.log("---req.session---");
        // console.log(req.session);
        const result = await getInitialStatus(
            req.session.userId,
            req.params.id
        );
        // console.log("---result in get-initial-status---");
        // console.log(result);
        res.json(result);
    } catch (err) {
        console.log("ERROR IN /get-initial-status/:id", err);
    }
});

app.post("/make-friend-request/:id", async (req, res) => {
    try {
        const result = await addFriendReq(req.session.userId, req.params.id);
        // console.log("---resukt in make-friend-request/:id---");
        // console.log(result);
        res.json(result);
    } catch (err) {
        console.log("ERROR IN /make-friend-request/:id", err);
    }
});

app.post("/accept-friend-request/:id", async (req, res) => {
    try {
        const result = await updateUsersFriendship(
            req.session.userId,
            req.params.id
        );
        console.log("----result in /accept-friend-request----");
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log("ERROR IN /accept-friend-request/", err);
    }
});

app.post("/end-friendship/:id", async (req, res) => {
    try {
        const result = await deleteFriendship(
            req.session.userId,
            req.params.id
        );
        console.log("----result in /end-friendship/:id----");
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log("ERROR IN /end-friendship/:id", err);
    }
});

app.get("/friends-wannabes", async (req, res) => {
    try {
        console.log("----req.session.userId----");
        console.log(req.session.userId);
        const result = await getAllFriends(req.session.userId);
        console.log("----RESULT IN /friends-wannabes----");
        console.log(result);
        res.json(result);
    } catch (err) {
        console.log("ERROR IN /friends-wannabes");
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

server.listen(8080, function () {
    console.log("I'm listening.");
});

io.on("connection", (socket) => {
    console.log(`socket with id ${socket.id} just CONNECTED!`);

    socket.on("hello", (data) => {
        console.log(data);
        socket.emit("niceToSeeYou", { youAreGoodLooking: true });
    });

    socket.on("disconnect", () => {
        console.log(`socket with id ${socket.id} just DISCONNECTED!`);
    });
});
