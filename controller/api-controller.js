// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const axios = require("axios").default;


//this function will get the response and filter it so we can access our data
function getdata(response){

  let albums = [];
  let albumsData = response.data.album;
  for (let i = 0; i < albumsData.length; i ++){
    albums.push({Artist: albumsData[i].strArtist, Album: albumsData[i].strAlbum, Genre: albumsData[i].strGenre, Thumb: albumsData[i].strAlbumThumb, Year: albumsData[i].intYearReleased});
    console.log(albums[i]);
  }
}

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/register", function(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  // Route to api call for audiodb
  // eslint-disable-next-line no-unused-vars
  app.get("/api/music_data/:artist", function(req, res) {
    let artist = req.params.artist;
    const apiKey = process.env.API_KEY;

    axios.get(`https://theaudiodb.com/api/v1/json/${apiKey}/searchalbum.php?s=${artist}`)
      .then((response) => {
        getdata(response);
        // res.send(response.data.album);

      })
      .catch((error) => {
        console.log(error);
      });
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", isAuthenticated, function(req, res) {
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
};



