angular.module('oobjclient', 
	[
	'ngRoute', 
	'ngCookies', 
	'ui.bootstrap', 
	'angular-ladda', 
	'angularMoment'
	]).config(function($routeProvider, $locationProvider){
		$locationProvider.hashPrefix('');    
	});
