// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const axios = require("axios");
const db = require("../models");

let currentCollection;

function checkCurrentData(albums){
  // console.log("recived data ");
  //console.log(albums);
  console.log("this is Current Collection");
  console.log(currentCollection);
  console.log("this is Searched Albums");
  console.log(albums);

  let newAlbums = {};
  for(let i = 0, j = 0; i < albums.length; i ++){
    if(currentCollection[i].artist === albums[j].artist){
      console.log("in true statment");
      for(let x = i; x < albums.length; x++){
        if(currentCollection[x].albumName === albums[x].albumName &&
            currentCollection[x].releaseYear === albums[x].releaseYear){
          console.log("in for Loop True ");
          console.log(currentCollection[x].artist + " " + currentCollection[x].albumName);
          console.log(albums[x].artist + " " + albums[x].albumName);
        }
      }

    } else {
      console.log("in the else statement");
      console.log(albums[i]);
      console.log("this is j value "+ j);
      newAlbums[j] = albums[i];
      console.log("this is NewAlbums data");
      console.log(newAlbums);
   
    }
  }

  //let newAlbums = albums.filter(item => ((item.artist !== currentCollection[0].artist || item.album !== currentCollection[0].album)));

  console.log("this is after the filter ");
  console.log(newAlbums);
  return newAlbums;
}


module.exports = function (app) {
  // route to index
  app.get("/", function (req, res) {
    if (req.user) {
      return res.redirect("/members");
    }
    res.render("index");
  });

  // route for registering a new user
  app.get("/register", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.render("register");
  });

  //server-side rendering of album objects onto the page
  app.get("/members", isAuthenticated, function (req, res) {
    db.Album.findAll({
      where: { UserId: req.user.id },
      order:["artist"]
      // include: [db.User]
    }).then(function (data) {
      // console.log(data);
      const albums = data.map(x => ({
        albumName: x.albumName,
        artist: x.artist,
        albumArt: x.albumArt,
        releaseYear: x.releaseYear,
        genre: x.genre,
        cd: x.cd,
        cassette: x.cassette,
        vinylSeven: x.vinylSeven,
        vinylTwelve: x.vinylTwelve,
        eightTrack: x.eightTrack,
        digital: x.digital,
        condition: x.condition,
        notes: x.notes
      }));
      //currentCollection will give the value to the Function checkCurrentData
      currentCollection = albums;
      // console.log(albums);
      res.render("collection", { albums: albums });

    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });


  });
  // album search
  app.get("/search", isAuthenticated, async function (req, res) {
    let artist = req.query.search;
    const apiKey = process.env.API_KEY;

    try {
      if (!artist) {
        return res.render("collection");
      }

      const response = await axios.get(`https://theaudiodb.com/api/v1/json/${apiKey}/searchalbum.php?s=${artist}`);
      // console.log(response.data.album);

      const albums = response.data.album.map(x => ({
        albumName: x.strAlbum,
        artist: x.strArtist,
        albumArt: x.strAlbumThumb,
        releaseYear: x.intYearReleased,
        genre: x.strGenre
      }));
      //this will return all the albums minus the members albums
      let minusMembersalbums = checkCurrentData(albums);

      res.render("search", { albums: minusMembersalbums });
    } catch (error) {
      // console.log(error);
      res.sendStatus(500);
    }
  });

};