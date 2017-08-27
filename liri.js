//the code that grabs the keys
var keys = require("./keys.js");
// variables to shorten the key callt
var twKeys = keys.twitterKeys;

// This is all all my NPM homies
var inquirer = require("inquire");
var twitter = require("twitter");
var request = require("request");
// var fs = request("fs");

// user input 
var input = process.argv[2];
var movieTitle = process.argv[3];

// Attempting to get more than 1 word responces. 
// var movieTitle;
// for (var i = 1; i < process.argv.length; i++) {
// 	movieTitle = process.argv[i];
// }




//User commands
if (input === "my-tweets") {
	return mytweets();
}

function mytweets() {

	var twitterClient = new twitter ({
		consumer_key: twKeys.consumer_key,
		consumer_secret: twKeys.consumer_secret,
		access_token_key: twKeys.access_token_key,
		access_token_secret: twKeys.access_token_secret,
	});

	var parameters = {
		screen_name: "netflix",
		count: 20,
		trim_user: false,
	}

	twitterClient.get('statuses/user_timeline', parameters, function(error, timeline, response){
		if(error){
			console.log(error);
		} else {
			for(tweet in timeline){
				var date = new Date(timeline[tweet].created_at);

				console.log('Tweet # : ' + (parseInt(tweet)+1));
				console.log('Date And Time: ' + date.toString().slice(0, 24));
				console.log('Tweet: ' + timeline[tweet].text);
				console.log('___________________________________')
	
			}
		} 
	});
}

if (input === "movie-this") {
	omdbInfo(movieTitle);
}

function omdbInfo(movieTitle) {
	request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
		if(error){
			console.log(error);
		};
		omdbReturn = JSON.parse(body);

		console.log(omdbReturn.Title);
		console.log("Year: " + omdbReturn.Year);
		console.log( "IMDB Rating: " + omdbReturn.imdbRating);
		console.log("Rotten Tomatoes Rating: " + omdbReturn.Ratings[1].Value);
		console.log("Country produced in: " + omdbReturn.Country);
		console.log("Language: " + omdbReturn.Language);
		console.log("Plot: " + omdbReturn.Plot);
		console.log("Actors: " + omdbReturn.Actors);




		// console.log(omdbReturn);

	})
}