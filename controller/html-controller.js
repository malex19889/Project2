
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const axios = require("axios").default;
//this function will get the response and filter it so we can access our data
function getdata(response) {

  let albums = [];
  let albumsData = response.data.album;
  for (let i = 0; i < albumsData.length; i++) {
    albums.push({ Artist: albumsData[i].strArtist, Album: albumsData[i].strAlbum, Genre: albumsData[i].strGenre, Thumb: albumsData[i].strAlbumThumb, Year: albumsData[i].intYearReleased });
    console.log(albums[i]);
  }
}

module.exports = function (app) {
  // route to index
  app.get("/", function (req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("index");
  });

  // route for registering a new user
  app.get("/register", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("register");
  });
  // Route to api call for audiodb
  // eslint-disable-next-line no-unused-vars
  app.get("/music_data/:artist", function (req, res) {
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
  // If a user who is not logged in tries to access this route they will be redirected to the login page
  app.get("/members", isAuthenticated, function (req, res) {
    res.render("collection");
  });

};
