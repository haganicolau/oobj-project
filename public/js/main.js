angular.module('oobjclient', 
	[
	'ngRoute', 
	'ngCookies', 
	'ui.bootstrap', 
	'angular-ladda', 
	'angularMoment',
	'cb.x2js',
	'ur.file',
	'ngResource'
	]).config(function($routeProvider, $locationProvider){
		$locationProvider.hashPrefix('');    
	});
