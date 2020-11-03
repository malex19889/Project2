// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // res.json(req.user);
    res.redirect("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/register", function (req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", isAuthenticated, function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.render("/");
    } else {
      // Otherwise send back the user's email and id
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  // post new albums to db
  app.post("/api/albums", function (req, res) {
    console.log(req.body);
    db.Album.create({
      artist: req.body.artist,
      albumName: req.body.album,
      albumArt: req.body.albumArt,
      releaseYear: req.body.year,
      genre: req.body.genre,
      cd: req.body.cd,
      cassette: req.body.cassette,
      vinylSeven: req.body.vinylSeven,
      vinylTwelve: req.body.vinylTwelve,
      eightTrack: req.body.eightTrack,
      digital: req.body.Digital,
      notes: req.body.notes,
      condition: req.body.condition,
      UserId: req.user.id
    })
      .then(function() {
        res.status(201);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
};



