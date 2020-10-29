function renderRecord(data) {
  if (data.length !== 0) {
    $("#stats").empty();
    $("#stats").show();
    for (var i = 0; i < data.length; i++) {
      var div = $("<div>");
      div.append("<h2>" + data[i].title + "</h2>");
      div.append("<p>Artist: " + data[i].artist + "</p>");
      div.append("<p>Genre: " + data[i].genre + "</p>");
      div.append("<p>Songs: " + data[i].songs + "</p>");
      div.append("<button class='delete' data-id='" + data[i].id + "'>DELETE RECORD</button>");
      $("#stats").append(div);
    }
    $(".delete").click(function() {
      $.ajax({
        method: "DELETE",
        url: "/api/record/" + $(this).attr("data-id")
});
      // On success, run the following code
      .then(function() {
        console.log("Deleted Successfully!");
        });
      $(this).closest("div").remove();
    });
  }
}

// When user hits the search-btn
$("#search-btn").on("click", function(event) {
  event.preventDefault();
  // Save the book they typed into the title-search input 
  var titleSearched = $("#title-search").val().trim();
  // Make an AJAX get request to our api,
  $.get("/api/" + titleSearched, function(data) {
    console.log(data);
    // Call our renderRecord function 
    renderRecord(data);
  });
});
// When user hits the artist-search-btn
$("#artist-search-btn").on("click", function() {
  // Save the author they typed into the artist-search input
  var artistSearched = $("#artist-search").val().trim();
  // Make an AJAX get request to our api, including the user's author in the url
  $.get("/api/artist/" + artistSearched, function(data) {
  // Log the data to the console
    console.log(data);
    // Call our renderBooks function to add our books to the page
    renderRecord(data);
  });
});
// When user hits the genre-search-btn
$("#genre-search-btn").on("click", function() {
  // Save the book they typed into the genre-search input
  var genreSearched = $("#genre-search").val().trim();
  // Make an AJAX get request to our api, including the user's genre in the url
  $.get("/api/genre/" + genreSearched, function(data) {
    console.log(data);
    // Call our renderRecord function
    renderRecord(data);
  });
});
function renderRecord(data) {
  if (data.length !== 0) {
    $("#stats").empty();
    $("#stats").show();
    for (var i = 0; i < data.length; i++) {
      var div = $("<div>");
      div.append("<h2>" + data[i].title + "</h2>");
      div.append("<p>Artist: " + data[i].artist + "</p>");
      div.append("<p>Genre: " + data[i].genre + "</p>");
      div.append("<p>Songs: " + data[i].songs + "</p>");
      div.append("<button class='delete' data-id='" + data[i].id + "'>DELETE RECORD</button>");
      $("#stats").append(div);
    }
    $(".delete").click(function() {
      $.ajax({
        method: "DELETE",
        url: "/api/record/" + $(this).attr("data-id")
      })
        // On success, run the following code
        .then(function() {
          console.log("Deleted Successfully!");
        });

      $(this).closest("div").remove();
    });
  }
}