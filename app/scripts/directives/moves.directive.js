'use strict';

angular.module(__appModule + '.game')
.directive('moves', [function() {
	
	return {
		restrict: 'E',
		replace: false,
		transclude : false,
		scope: {
			currentPlayer: '='
		},
		templateUrl: 'templates/moves.html',
		link: function (scope, element, attrs) {
			scope.option = null;
			scope.hasSelected = false;

			scope.$on('$destroy', function() {
			});

			scope.select = function() {
				scope.$emit('moves:update-selection', scope.option);
				scope.option = null;
				scope.hasSelected = false;
			};
		},
		controller : ['$scope', '$rootScope', function(scope, rootScope){
			scope.$watch('option', function (newVal, oldVal) {
				if (newVal && (newVal !== oldVal)) {
					scope.hasSelected = true;
				}
			});	
		}]
	};

}]);
