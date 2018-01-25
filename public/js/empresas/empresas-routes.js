/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */
 
angular.module('oobjclient')
	.config(function($routeProvider){
			   // $locationProvider.html5Mode(true);

		$routeProvider.when('/empresas', {
            templateUrl: 'views/empresas/index.html',
            controller: 'ListaEmpresasController',
            resolve:{
            	teste : function(isLogged){
            		isLogged.logged();
            	}
            }
        });  
});