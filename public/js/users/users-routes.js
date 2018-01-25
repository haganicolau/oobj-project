/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */

/* rotas de usuários */
angular.module('oobjclient')
	.config(function($routeProvider){
			   // $locationProvider.html5Mode(true);

		$routeProvider.when('/usuarios', {
            templateUrl: 'views/users/index.html',
            controller: 'ListaUsersController',
            resolve:{
            	teste : function(isLogged){
            		isLogged.logged();
            	}
            }
        });  
});