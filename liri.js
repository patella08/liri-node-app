// Imports
var keys = require("./keys");
var twitter = require("twitter"); 
var request = require("request");
var Spotify = require ("node-spotify-api");
var liriArgument = process.argv[2];
var fs = require("fs");

// ---------------------------------------------------------------------------------------------------------------
	// Commands
	switch(liriArgument) {
		case "my-tweets": myTweets(); break;
		case "spotify-this-song": spotifyThisSong(); break;
		case "movie-this": movieThis(); break;
		case "do-what-it-says": doWhatItSays(); break;
	// Instructions 
		default: console.log("\r\n" +"Try one of the following commands after 'node liri.js' : " +"\r\n"+
			"1. my-tweets" + "\r\n" +
			"2. spotify-this-song 'any song' "+"\r\n"+
			"3. movie-this 'any movie' "+"\r\n"+
			"4. do-what-it-says."+"\r\n"+
			"Be sure to put the movie or song name in quotation marks if it's more than one word.");
	};
// ---------------------------------------------------------------------------------------------------------------
// Functions
	// Movie 
	function movieThis(){
		var movie = process.argv[3];
		request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=4d7a4255", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var movieObject = JSON.parse(body);
				console.log("------------------------------------------------------------" + "\r\n" +
        "Title: " + movieObject.Title +"\r\n"+
				"Year: " + movieObject.Year+"\r\n"+
				"Imdb Rating: " + movieObject.imdbRating+"\r\n"+
				"Country: " + movieObject.Country+"\r\n"+
				"Language: " + movieObject.Language+"\r\n"+
				"Plot: " + movieObject.Plot+"\r\n"+
				"Actors: " + movieObject.Actors+"\r\n"+
				"Rotten Tomatoes Rating: " + movieObject.Ratings[1].Value +"\r\n"+
				"------------------------------------------------------------" + "\r\n");
      } 
      if (movie === "Mr Nobody") {
        console.log("--------------------------------------------------")
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/")
        console.log("It's on Netflix!")
        console.log("--------------------------------------------------")
      }
		});
	};
	// Twitter
  function myTweets() {
    var client = new twitter(keys);
  
    var params = {
      screen_name: "patella0802"
    };
  
    client.get("statuses/user_timeline", params, function(err, data, response) {
      if(!err){
          for (i = 0; i < data.length; i++) {
          console.log("---------------------------");
          console.log("@patella0802: " + data[i].text + " Date: " + data[i].created_at.substring(0, 19));
          }
        } else {
          console.log(err);
      }
    });
  };
	// Spotify
	function spotifyThisSong(songName) {
    var songName = process.argv[3];
    var spotify = new Spotify ({
      id: "acbd9d44dd614b1394c108b0e1b7c766",
      secret: "81087a5d132347c3ad7ade6cc87478e1"
    });
    if(!songName){
      songName = "The Sign Ace of Base";
    }
		spotify.search({ type: "track", query: songName, limit: 1 }, function(err, data) {
      if(!err){
				for (var i = 0; i < data.tracks.items.length; i++) {
            var songInfo = data.tracks.items[i];

            console.log("-------------------------------------------------");
						console.log("Artist: " + songInfo.artists[0].name);
						console.log("Song: " + songInfo.name);
						console.log("Album the song is from: " + songInfo.album.name);
						console.log("Preview Url: " + songInfo.preview_url); 
						console.log("-------------------------------------------------");
				}
      }
		});
	};
// Do What It Says
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data){
    if (!error) {
      doWhatItSaysResults = data.split(",");
      spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
    } else {
      console.log("Error occurred" + error);
    }
  });
};
