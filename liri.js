require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var firstArg = process.argv[2];
var secondArg = process.argv[3];

start1(firstArg, secondArg);

function start1(argOne, argTwo) {
  runthis(argOne, argTwo);
}
function runthis(caseData, functionData) {
  switch (caseData) {
    case "concert-this":
      getMyBands(functionData);
      break;
    case "spotify-this-song":
      getMeSpoftify(functionData);
      break;
    case "movie-this":
      getMeMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("Enter in the correct option");
  }
}

function getMeSpoftify(songName) {
  if (songName === undefined) {
    songName = "The Sign";
  }
  console.log("songName: " + songName);
  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, response) {
      if (err) {
        console.log("error: " + err);
        return;
      }
      console.log(JSON.stringify(response));
      console.log(response);
      var songs = response.tracks.items;

      console.log("songs" + songs);
      for (var i = 0; i < songs.length; i++) {
        console.log("Artist(s): " + songs[0].artists[0].name);
        console.log("Song Name: " + songs[0].name);
        console.log("Album: " + songs[i].album.name);
        console.log("Preview Link:" + songs[0].preview_url);
        console.log("--------------------------------------------");
      }
    }
  );
}

// Code using OMDB API to search for movies
function getMeMovie(movies) {
  axios
    .get(
      "http://www.omdbapi.com/?t=" + movies + "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log("Title of the Movie: " + response.data.Title);
      console.log("Release Date: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.tomatoRating);
      console.log("Country Origin: " + response.data.Country);
      console.log("Movie Language: " + response.data.Language);
      console.log("Movie Plot: " + response.data.Plot);
      console.log("Actors in the Movie: " + response.data.Actors);
      console.log("------------------------------------------------");
    })
    .catch(function(error) {
      console.log(error);
    });
}
