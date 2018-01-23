angular.module('oobjclient')
	.config(function($routeProvider){
			   // $locationProvider.html5Mode(true);

		$routeProvider.when('/import', {
            templateUrl: 'views/relatorio/upload-file.html',
            controller: 'RelatorioController',
            resolve:{
            	teste : function(isLogged){
            		isLogged.logged();
            	}
            }
        });  
});