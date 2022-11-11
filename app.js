const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware')
const path = require('path')
const bodyParser = require("body-parser")
const mongoose=require('./database');
const server = app.listen(port, () => console.log("Server listening on port " + port));
const session=require('express-session');
app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret:"norah",
    resave: true,
    saveUninitialized: false,
}))
// Routes
// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

// Api routes
const postsApiRoute = require('./routes/api/posts');
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/api/posts", postsApiRoute);
const logoutRoute = require('./routes/logout');



app.use("/logout", logoutRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {

    var payload = {
        pageTitle: "Home",
        userLoggedIn:req.session.user,
        userLoggedInjs:JSON.stringify(req.session.user),
    }

    res.status(200).render("home", payload);
})