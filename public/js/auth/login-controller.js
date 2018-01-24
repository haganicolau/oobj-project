angular.module('oobjclient')
	.controller('LoginController', function($scope, $http, $cookies, urlDominio, $window){

	$scope.usuario={
		'email':'',
		'password':''
	};
	
	var url = urlDominio.getUrl();

	$scope.logar = function(){
		$scope.loading=true;

		var req = {
			method: 'POST',
			url: url.concat('/login'),
			data: $scope.usuario,
			headers:{
				"Content-Type": "application/json"
			}	
		};

		$http(req).then(function(response){
			$cookies.put('x-token',response.data.body.token.token);
			$cookies.put('x-token-issued',response.data.body.token.issued);
			$cookies.put('x-user',response.data.body.user);
			$window.location.href = '/#/empresas';
				
		}).catch(function(erro){
			$scope.loading=false;
			if(erro.status==401){
				$scope.mensagem='Senha ou Email inválidos!';
			} else {
				$scope.mensagem="Problemas na sua conta - Entre em contato com o Administrador.";
			}
		});
	};

	$scope.logout = function(){
		$cookies.remove('x-token');
		$cookies.remove('x-token-issued');
		$window.location.href = '/#/login';
	}
});
