'use strict';

angular.module(__appModule + '.game')
.factory('GameService', ['$q', '$http', function($q, $http) {
	var that = this;
	var urlPrefix = '/';

	var initGame = function(players) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: urlPrefix + 'game',
			data: {
				player_a: players.playerA.name,
				player_b: players.playerB.name
			}
		}).then(function (response) {
			if (response.data.players){
				deferred.resolve(response.data);
			} else {
				deferred.reject('Error');
			}
		}, function (response) {
			deferred.reject('Error');
		});
		return deferred.promise;
	};

	var getCurrentGames = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: urlPrefix + 'game/current'
		}).then(function (response) {
			if (response.data.players){
				deferred.resolve(response.data);
			} else {
				deferred.reject(null); //no players
			}
		}, function (response) {
			deferred.reject('Error');
		});
		return deferred.promise;
	};

	var performRound = function(optionPlayerA, optionPlayerB) {
		var deferred = $q.defer();
		$http({
			method: 'PUT',
			url: urlPrefix + 'game/current/play',
			data: {
				player_a: optionPlayerA,
				player_b: optionPlayerB
			}
		}).then(function (response) {
			deferred.resolve(response.data);
		}, function (response) {
			deferred.reject('Error');
		});
		return deferred.promise;
	};

	var getWinner = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: urlPrefix + 'game/current/winner'
		}).then(function (response) {
			deferred.resolve(response.data);
		}, function (response) {
			deferred.reject('Error');
		});
		return deferred.promise;
	};

	return {
		initGame: initGame,
		getCurrentGames: getCurrentGames,
		performRound: performRound,
		getWinner: getWinner
	};
}]);
