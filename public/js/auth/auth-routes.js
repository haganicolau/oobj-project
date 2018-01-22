	
angular.module('oobjclient')
	.config(function($routeProvider){
			   // $locationProvider.html5Mode(true);

		$routeProvider.when('/login', {
            templateUrl: 'views/auth/login.html',
            controller: 'LoginController'
        });
      
});
