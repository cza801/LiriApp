//the code that grabs the keys
var keys = require("./keys.js");
// variables to shorten the key callt
var twKeys = keys.twitterKeys;

// This is all all my NPM homies
var inquirer = require("inquire");
var twitter = require("twitter");
// var fs = request("fs");

// user input 
var input = process.argv[2];

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