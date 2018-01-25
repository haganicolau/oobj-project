/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */
 	
angular.module('oobjclient')
	.config(function($routeProvider){
			   
		/*Rota para login*/
		$routeProvider.when('/login', {
            templateUrl: 'views/auth/login.html',
            controller: 'LoginController'
        });
      
});
