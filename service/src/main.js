var express = require('express');

// Game module
var game = require('./game.js');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('app'));

// get current game
app.get('/game/current', function (req, res) {
	res.end(JSON.stringify(game.getCurrentGames()));
})
// get winner of the game
.get('/game/current/winner', function (req, res) {
	res.end(JSON.stringify(game.getWinner()));
})
// play a turn
.put('/game/current/play', function (req, res) {
	var r = game.performRound(req.body.player_a, req.body.player_b);
	res.end(JSON.stringify(r));
})
// create a game
.post('/game', function (req, res) {
	var r = game.initGame({
		playerA: {name: req.body.player_a}, 
		playerB: {name: req.body.player_b}
	});
	res.end(JSON.stringify(r));
});

var server = app.listen(8000, 'localhost', function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log("Game initialized at http://%s:%s", host, port)

});