// import the following:
const express = require("express");

// Create the router for the app
const router = express.Router();
//
router.get("/", function (req, res) {
  res.render("index");
});
//
router.post("/api/", function (req, res) {
  res.send("");
});
//  listener for
router.put("/api//:id", function (req, res) {
  res.send("");
});

// export thr express router
module.exports = router;
