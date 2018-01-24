angular.module('oobjclient')
	.controller('ListaUsersController', function($scope, $http, $cookies, urlDominio, $window){
		
		let url = urlDominio.getUrl();
		$scope.users ='';

		let req = {
			method: 'GET',
			url: url.concat('/users'),
			headers:{
				"Content-Type": "application/json",
				"x-token": $cookies.get('x-token'),
				"x-token-issued" : $cookies.get('x-token-issued')
			}
		}	

		$http(req).then(function(response){

			$scope.users = response.data.body.response;
			$scope.users.createdAt=moment($scope.users.createdAt).format('DD-MM-YYYY');
			$scope.mensagem = '';
				
		}).catch(function(erro){
			$scope.mensagem='Houve um erro ao carregar a lista, tente novamente!';
		});


});