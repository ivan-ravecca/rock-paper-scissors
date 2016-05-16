'use strict';

angular.module(__appModule + '.game')
/**
 * Playing controller 
 * @param  {Object} $scope       ctrl scope
 * @param  {Object} $location    $location service
 * @param  {Object} GameService		Main game service
 */
.controller('PlayingCtrl', ['$scope', '$location', 'GameService', function($scope, $location, GameService) {

	/**
	 * Sub state variable to hold current round info
	 * @type {Object}
	 */
	var game = {
			playerA : null,
			playerB: null
		};

	$scope.players = null;
	$scope.currentPlayer = null;
	$scope.roundNumber = null;

	/**
	 * Bootstrap playing round
	 */
	var init = function() {
		$scope.players = null;
		$scope.currentPlayer = null;
		$scope.roundNumber = null;
		game = {
			playerA : null,
			playerB: null
		};

		GameService.getCurrentGames().then(function(gameStatus) {
			$scope.players = gameStatus.players;
			$scope.rounds = gameStatus.rounds;
			$scope.currentPlayer = gameStatus.players.playerA;
			$scope.roundNumber = $scope.rounds.length + 1;
		}, function() {
			$location.path('/'); // no players
		});
	}

	/**
	 * Play a turn
	 * @param  {Object} game the state game variable
	 */
	var performOption = function(game) {
		GameService.performRound(game.playerA, game.playerB).then(function(result) {
			if (result.doWeHaveAWinner) {
				$location.path('won');
			} else {
				init();
			}
		});
	};

	// Register listener of directive
	var listener = $scope.$on('moves:update-selection', function(event, value) {
		if (game.playerA === null) {
			game.playerA = value;
			$scope.currentPlayer = $scope.players.playerB;
		} else if (game.playerB === null) {
			game.playerB = value;
		}
		if (game.playerA && game.playerB) {
			performOption(game);
		}
	});

	$scope.$on('$destroy', function() {
		// what  should i destroy?
		listener();
	});

	// bootstrap game
	init();

}]);
