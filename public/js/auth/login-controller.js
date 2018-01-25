/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */
angular.module('oobjclient')
	.controller('LoginController', function($scope, $http, $cookies, urlDominio, $window){

	/*objeto usuário para controle de login*/
	$scope.usuario={
		'email':'',
		'password':''
	};
	
	var url = urlDominio.getUrl();

	/*Ação do click para logar*/
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

		/* executa requisição a partir das configurações na variável req, se resposta 
		 * válida, quer dizer que os dados de login estão corretos, insere o token e a 
		 * data do token no header.*/
		$http(req).then(function(response){
			$cookies.put('x-token',response.data.body.token.token);
			$cookies.put('x-token-issued',response.data.body.token.issued);
			$cookies.put('x-user',response.data.body.user);
			$window.location.href = '/#/empresas';
				
		/*Se os dados não forem válidos, apresentar mensagem de erro*/
		}).catch(function(erro){
			$scope.loading=false;
			if(erro.status==401){
				$scope.mensagem='Senha ou Email inválidos!';
			} else {
				$scope.mensagem="Problemas na sua conta - Entre em contato com o Administrador.";
			}
		});
	};

	/*Ação do click para remover as credenciais de acesso e login*/
	$scope.logout = function(){
		$cookies.remove('x-token');
		$cookies.remove('x-token-issued');
		$window.location.href = '/#/login';
	}
});
