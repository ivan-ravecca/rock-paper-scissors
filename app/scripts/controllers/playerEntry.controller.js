'use strict';

angular.module(__appModule + '.game')
/**
 * Controller for landing page of game
 * @param  {Object} $scope       ctrl scope
 * @param  {Object} $location    $location service
 * @param  {Object} GameService		Main game service
  */
.controller('PlayerEntryCtrl', 
	['$scope', '$location', 'GameService', function ($scope, $location, GameService) {
	
	$scope.players = {playerA: {name: null}, playerB: {name: null}};

	$scope.isStartEnabled = function () {
		var shortCut = $scope.players;
		return angular.isString(shortCut.playerA.name)  
			&& angular.isString(shortCut.playerB.name)
			&& shortCut.playerA.name.length > 2
			&& shortCut.playerB.name.length > 2
			&& shortCut.playerA.name !== shortCut.playerB.name;
	};

	/**
	 * Action button ~ start app state one both log in
	 */
	$scope.startGame = function () {
		if (!$scope.isStartEnabled()) { 
			return false; 
		}
		GameService.initGame($scope.players).then( function () {
			$location.path('play');
		});
	};

}]);
