'use strict';

// Declare app level module which depends on views, and components
var __appModule = 'myApp';
angular.module(__appModule + '.game', []);
angular.module(__appModule, [
	'ngRoute',
	__appModule + '.game',
	__appModule + '.version'
]).config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/entry', {
			templateUrl: 'templates/players-entry.html',
			controller: 'PlayerEntryCtrl'
		})
		.when('/play', {
			templateUrl: 'templates/take-turn.html',
			controller: 'PlayingCtrl'
		})
		.when('/won', {
			templateUrl: 'templates/won.html',
			controller: 'WonCtrl'
		})
		.otherwise({redirectTo: '/entry'});
}]).factory('angularVersion', function angularVersion() {
	return angular.version;
});
