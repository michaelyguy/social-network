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
    getLastTenMsgs,
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

//// new cookie session for socket.io //////
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/password/reset/start", (req, res) => {
    getUser(req.body.email)
        .then((result) => {
            if (result.rows.length > 0) {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                insertCode(req.body.email, secretCode)
                    .then((result) => {
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
    getCode(req.body.email, req.body.code)
        .then((result) => {
            if (result.rows.length > 0) {
                hash(req.body.newPassword).then((hashedPw) => {
                    updatePassword(hashedPw, result.rows[0].id)
                        .then((result) => {
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
    hash(req.body.password).then((hashedPw) => {
        insertRegister(req.body.first, req.body.last, req.body.email, hashedPw)
            .then((result) => {
                req.session.userId = result.rows[0].id;
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
            if (result.rows.length <= 0) {
                res.redirect("/register");
            } else {
                compare(req.body.password, result.rows[0].password).then(
                    (match) => {
                        if (match == true) {
                            req.session.userId = result.rows[0].id;
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
    try {
        const result = await getOtherProfile(req.params.id);
        res.json(result.rows[0]);
    } catch (err) {
        console.log("ERROR IN /USER:ID");
    }
});

app.get("/user", (req, res) => {
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
        res.json(result.rows[0]);
    } catch (err) {
        console.log("ERROR IN BIO/EDITOR");
    }
});

app.post("/upload", uploader.single("imgurl"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const imageUrl = `${s3Url}${filename}`;
    if (filename) {
        updateProfilePic(imageUrl, req.session.userId)
            .then((result) => {
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
        const result = await getMatchingUsers(req.query.name);
        res.json(result.rows);
    } catch (err) {
        console.log("ERROR IN /api/more/users:id", err);
    }
});

app.get("/get-initial-status/:id", async (req, res) => {
    try {
        const result = await getInitialStatus(
            req.session.userId,
            req.params.id
        );
        res.json(result);
    } catch (err) {
        console.log("ERROR IN /get-initial-status/:id", err);
    }
});

app.post("/make-friend-request/:id", async (req, res) => {
    try {
        const result = await addFriendReq(req.session.userId, req.params.id);
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
        res.json(result);
    } catch (err) {
        console.log("ERROR IN /end-friendship/:id", err);
    }
});

app.get("/friends-wannabes", async (req, res) => {
    try {
        const result = await getAllFriends(req.session.userId);
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

io.on("connection", async (socket) => {
    try {
        //// all the socekt code need to be insdie of this block ////
        console.log(`socket with id ${socket.id} just CONNECTED!`);

        if (!socket.request.session.userId) {
            return socket.disconnect(true);
        }

        const userId = socket.request.session.userId;

        const result = await getLastTenMsgs();
        console.log("----result in get last 10 msgs----");
        console.log(result);

        io.sockets.emit("chatMessages", result.rows);

        socket.on("disconnect", () => {
            console.log(`socket with id ${socket.id} just DISCONNECTED!`);
        });
    } catch (err) {
        console.log("ERROR IN CONNECTION SOCKET", err);
    }
});
