'use strict';


angular.module(__appModule + '.game')

.controller('WonCtrl', 
	['$scope', '$location', 'GameService', function($scope, $location, GameService) {
	
	GameService.getWinner().then(function(winner) {
		$scope.winner = winner ? winner : null;
		if ($scope.winner === null) {
			$location.path('/');
		}
	});
	$scope.playAgain = function() {
		$location.path('/');
	};
}]);
