/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */

 /*controlador para adicionar empresa*/
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

/*Gera o formulário de adicionar empresa*/
var ModalInstanceEmpresa = function ($scope, $http, $modalInstance, empresaForm,urlDominio, $cookies) {
    $scope.mensagem_success='';

    /*Ao clicar no botão do formulário esta função será executada*/
	$scope.submitFormSaveEmpresa = function(){
        
        /*incializa o spin para impedir de clicar no botão mais de uma vez*/
		$scope.loading=true;
		$scope.mensagem_error='';

		var valid = true;

        /*valida as informações*/
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

        /* se a informação válida, enviar os dados para a api servidor, por meio da rota 
         * correta
         */
        if(valid){
        	var url = urlDominio.getUrl();

            /*características da requisição*/
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

            /*envio da resquisição e resposta*/
            $http(req).then(function(data){
            	empresa = data.data.body.data;
                $scope.mensagem_success = "Cadastro realizado com sucesso";
                $scope.loading=false;
                $scope.empresa = {};

                /* Cria um canal de comunicação entre contexto diferentes, ou seja controllers diferentes
                 * para outro controller, com objetivo de enviar o novo cadastro 
                 * para adicionar na lista de empresas já renderizada.
                 */
                $scope.$emit('update_list_empresa', empresa);
            })
            .catch(function(erro){
                $scope.loading=false;
                $scope.mensagem_error=erro.data.message;
            })
        }
        else{
            /*desativa o spin*/
            $scope.loading=false;
        }
	}

    /*fechar modal*/
    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
};

