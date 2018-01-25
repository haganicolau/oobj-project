/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */
	
angular.module('oobjclient')
	.config(function($routeProvider, $locationProvider){

		
	    $routeProvider.when('/', {
			templateUrl: 'views/auth/login.html',
            controller: 'LoginController'
		});

	    $routeProvider.otherwise({redirectTo: '/empresas'});
});