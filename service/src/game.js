var rules = require('./rules.js');

var game = module.exports = {};

var __state = {
	players: null,
	rounds: []
};

var getWinnerObj = function() {
	var players = {};
	var shortCut = __state.players;
	if (shortCut === null){
		return false; // you are asking for this data when actually doesn't exist
	}
	players[shortCut.playerA.name] = 0;
	players[shortCut.playerB.name] = 0;
	__state.rounds.forEach(function(round) {
		if (round.winnerExist) {
			players[round.player.name]++;
		}
	});
	if (players[shortCut.playerA.name] > 2) {
		return shortCut.playerA;
	} else if (players[shortCut.playerB.name] > 2) {
		return shortCut.playerB;
	} else {
		return false;
	}
};

game.initGame = function(players) {
	__state.rounds = [];
	__state.players = players ? players : null;
	return __state;
};

game.getCurrentGames = function() {
	return {players: __state.players, rounds: __state.rounds};
};

game.performRound = function(optionPlayerA, optionPlayerB) {
	var winner = null;

	switch(rules.runRules(optionPlayerA, optionPlayerB)){
		case 1: 
			winner = __state.players.playerA;
			break;
		case -1: 
			winner = __state.players.playerB;
			break;
		case 0: 
			winner = null;
			break;
	}

	__state.rounds.push({
		stage: __state.rounds.length + 1,
		winnerExist: winner !== null,
		player: winner
	});

	return {doWeHaveAWinner: (getWinnerObj()), rounds: __state.rounds, players: __state.players};
};

game.getWinner = function() {
	var winner = getWinnerObj();
	return (winner === false) ? {} : winner;
};
