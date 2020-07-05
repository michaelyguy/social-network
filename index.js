const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const { insertRegister } = require("./db.js");

app.use(compression());
app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 24 * 14,
    })
);
app.use(express.static("./public"));
app.use(express.json());

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

app.post("/register", (req, res) => {
    console.log("------REQ.BODY------");
    console.log(req.body);
    insertRegister(
        req.body.first,
        req.body.last,
        req.params.email,
        req.params.password
    )
        .then((result) => {
            console.log("------RESULT IN /COMMENT POST-------");
            console.log(result);
            // res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("-----ERROR IN CATCH /REGISTER POST-----", err);
        });
});

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
