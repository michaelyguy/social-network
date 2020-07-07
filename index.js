const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const { insertRegister, getHashedPassword } = require("./db.js");
const csurf = require("csurf");
const { hash, compare } = require("./bc.js");
const cryptoRandomString = require("crypto-random-string");

app.use(compression());
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 24 * 14,
    })
);

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
    getHashedPassword(req.body.email)
        .then((result) => {
            console.log("----RESULT IN /RESET PASSWORD--");
            console.log(result);
            if (result.rows.length > 0) {
                const cryptoRandomString = require("crypto-random-string");
                const secretCode = cryptoRandomString({
                    length: 6,
                });
            } else {
                res.json({ error: true });
            }
        })
        .catch((err) => {
            console.log("ERROR IN CATCH /RESET PASSWORD", err);
        });
});

app.post("/register", (req, res) => {
    console.log("------REQ.BODY------");
    console.log(req.body);
    hash(req.body.password).then((hashedPw) => {
        console.log("------HASEDPASSWORD-----");
        console.log(hashedPw);
        insertRegister(req.body.first, req.body.last, req.body.email, hashedPw)
            .then((result) => {
                console.log("------RESULT IN /REGISTER POST-------");
                console.log(result);
                // req.session.userId = result.rows[0].id;
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
    getHashedPassword(req.body.email)
        .then((result) => {
            // console.log("----RESULT IN POST /LOGIN----");
            // console.log(result);
            if (result.rows.length <= 0) {
                res.redirect("/register");
            } else {
                compare(req.body.password, result.rows[0].password).then(
                    (match) => {
                        console.log("PASSWORD CORRECT?: ", match);
                        if (match == true) {
                            req.session.userId = result.rows[0].id;
                            console.log(req.session);
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
