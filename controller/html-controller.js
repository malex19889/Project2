
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // route to index
  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("index");
  });

  // route for registering a new user
  app.get("/register", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("register");
  });

  // If a user who is not logged in tries to access this route they will be redirected to the login page
  app.get("/members", isAuthenticated, function(req, res) {
    res.render("collection");
  });

};
