angular.module('oobjclient')
	.config(function($routeProvider){
			   // $locationProvider.html5Mode(true);

		$routeProvider.when('/filiais/:empresa', {
            templateUrl: 'views/filiais/index.html',
            controller: 'ListFiliaisController',
            resolve:{
            	teste : function(isLogged){
            		isLogged.logged();
            	}
            }
        });  
});