'use strict';

angular.module('myApp.version.version-directive', [])

.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.html('Angular seed version: ' + version
    	+ '<br/>Angular version ' + angular.version.full);
  };
}]);
