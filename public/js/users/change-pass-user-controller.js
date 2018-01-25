/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */

/* Controlador criado para gerenciar a mudança de senhas.
 */
angular.module('oobjclient')
	.controller('ChangePassUserController', function($scope, $modal, $http, $cookies, urlDominio, $window){

		$scope.user = {};

        /*chama o modal para alteração de senhas*/
        $scope.showModelPass = function(){

            var modalInstance = $modal.open({
                templateUrl: '/views/users/change-pass.html',
                controller: ModalInstancePass,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.user={user: $scope.user};
                    }
                }
            });
        };
});

/*Modal*/
var ModalInstancePass = function ($scope, $timeout, $http, $modalInstance, userForm,urlDominio, $cookies) {
    $scope.mensagem_success='';

	$scope.submitFormSaveUser = function(){
		/*ativa o spin*/
        $scope.loading=true;
		$scope.mensagem_error='';

		var valid = true;

        /*valida se as informações estão ok*/
		if(!userForm.password){
            $scope.mensagem_error='Informe Password';
            valid = false;
        }

        if(!userForm.confirm_password){
        	$scope.mensagem_error='Confirme Passowrd';
            valid = false;
        }

        if(userForm.password !== userForm.confirm_password){
            $scope.mensagem_error='Password e Confirme Password devem ser iguais';
            valid = false;
        }

        if(valid){
        	var url = urlDominio.getUrl();

            /*característica da requisição*/
        	var req = {
                method: 'PUT',
                url: url.concat('/editPass'),
                data: userForm,
                param: {id: $cookies.get('x-user')},
                headers:{
                    "Content-Type": "application/json",
					"x-token": $cookies.get('x-token'),
					"x-token-issued" : $cookies.get('x-token-issued')
                }
            };
            /*Envio da requisição*/
            $http(req).then(function(data){

                $scope.mensagem_success = "Mudança realizada com sucesso";
                $scope.loading=false;
                $scope.user = {};

            })
            .catch(function(erro){
                $scope.loading=false;
                $scope.mensagem_error=erro.data.message;
            })
        } else{
            /*desativa o spin*/
            $scope.loading=false;
        }
	}

    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
};

