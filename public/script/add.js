$("#add-btn").on("click", function(event) {
  event.preventDefault();
  // Make a newRecord object
  var newRecord = {
    title: $("#title").val().trim(),
    artist: $("#artist").val().trim(),
    genre: $("#genre").val().trim(),
    songCount: $("#songCount").val().trim()
  };


  $.post("/api/new", newRecord)
  // On success, run the following code
    .then(function(data) {
      // Log the data we found
      console.log(data);
    });


  $("#title").val("");
  $("#artist").val("");
  $("#genre").val("");
  $("#songCount").val("");
});