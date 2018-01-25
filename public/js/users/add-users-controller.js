angular.module('oobjclient')
	.controller('AddUsersController', function($scope, $modal, $http, $cookies, urlDominio, $window){

		$scope.user = {};

        /*chama o modal para cadastro de empresa*/
        $scope.showFormAdd = function(){

            var modalInstance = $modal.open({
                templateUrl: '/views/users/new-user.html',
                controller: ModalInstanceUser,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.user={user: $scope.user};
                    }
                }
            });
        };
});

var ModalInstanceUser = function ($scope, $http, $modalInstance, userForm,urlDominio, $cookies) {
    $scope.mensagem_success='';

	$scope.submitFormSaveUser = function(){
		$scope.loading=true;
		$scope.mensagem_error='';

		var valid = true;

		if(!userForm.name){
            $scope.mensagem_error='Informe Nome';
            valid = false;
        }

        if(!userForm.email){
            $scope.mensagem_error='Informe Email';
            valid = false;
        }

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

        	var req = {
                method: 'POST',
                url: url.concat('/users'),
                data: userForm,
                headers:{
                    "Content-Type": "application/json",
					"x-token": $cookies.get('x-token'),
					"x-token-issued" : $cookies.get('x-token-issued')
                }
            };
            $http(req).then(function(data){

            	user = data.data.body.data;
                $scope.mensagem_success = "Cadastro realizado com sucesso";
                $scope.loading=false;
                $scope.user = {};
                $scope.$emit('update_list_user', user);
                $modalInstance.close('cancel');
            })
            .catch(function(erro){
                $scope.loading=false;
                $scope.mensagem_error=erro.data.message;
            })
        } else{
            $scope.loading=false;
        }
	}

    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
};

