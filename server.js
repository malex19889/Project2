const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
// Use sessions to keep track of our user's login status
app.use(
  session({ secret: "cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
const exphbs = require("express-handlebars");
// Set handlebars as default template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./controller/html-controller")(app);
require("./controller/api-controller")(app);
// app.use(routes);

db.sequelize.sync().then(() => {
  app.listen(PORT, function () {
    console.log("App now listening at localhost:" + PORT);
  });
});

