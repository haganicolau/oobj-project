angular.module('oobjclient')
	.controller('AddEmpresasController', function($scope, $modal, $http, $cookies, urlDominio, $window){

		$scope.empresa = {};
		$scope.id = 0;

        /*chama o modal para cadastro de empresa*/
        $scope.showFormAdd = function(){

            var modalInstance = $modal.open({
                templateUrl: '/views/empresas/new-empresa.html',
                controller: ModalInstanceEmpresa,
                scope: $scope,
                resolve: {
                    empresaForm: function () {
                        return $scope.empresa={empresa: $scope.empresa};
                    }
                }
            });
        };
});

var ModalInstanceEmpresa = function ($scope, $http, $modalInstance, empresaForm,urlDominio, $cookies) {
    $scope.mensagem_success='';

	$scope.submitFormSaveEmpresa = function(){
		$scope.loading=true;
		$scope.mensagem_error='';

		var valid = true;

		if(!empresaForm.razao_social){
            $scope.mensagem_error='Informe Razão Social';
            valid = false;
        }

		if(!empresaForm.cnpj_base){
            $scope.mensagem_error='Informe CNPJ BASE';
            valid = false;
        }

        if(!empresaForm.status){
        	$scope.mensagem_error='Selecione um status';
            valid = false;
        }

        if(valid){
        	var url = urlDominio.getUrl();

        	var req = {
                method: 'POST',
                url: url.concat('/empresas'),
                data: empresaForm,
                headers:{
                    "Content-Type": "application/json",
					"x-token": $cookies.get('x-token'),
					"x-token-issued" : $cookies.get('x-token-issued')
                }
            };

            $http(req).then(function(data){
            	empresa = data.data.body.data;
                $scope.mensagem_success = "Cadastro realizado com sucesso";
                $scope.loading=false;
                $scope.$emit('update_list_empresa', empresa);
            })
            .catch(function(erro){
                $scope.loading=false;
                $scope.mensagem_error=erro.data;
            })
        }
	}

    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
};

