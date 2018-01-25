/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */

  /*controlador para editar empresa*/
angular.module('oobjclient')
    .controller('EditEmpresasController', function($scope, $modal, $http, $cookies, urlDominio, $window){

        /* Canal entre controlloers diferentes recebe o dado da empresa a partir do 
         * controller da lista de empresas
         */
        $scope.$on('modalEditEmpresa', function(event, mass) { 
            $scope.empresa = mass;
            
            /*chama o modal para edição de empresa*/
            var modalInstance = $modal.open({
                templateUrl: '/views/empresas/edit-empresa.html',
                controller: ModalInstanceEditEmpresa,
                scope: $scope,
                resolve: {
                    empresaForm: function () {
                        return $scope.empresa;
                    }
                }
            });
        });
});

/*Gera o formulário de edite empresa*/
var ModalInstanceEditEmpresa = function ($scope, $http, $modalInstance, empresaForm, urlDominio, $cookies) {
    $scope.mensagem_success='';

    $scope.submitFormEditEmpresa = function(){
        $scope.loading=true;
        $scope.mensagem_error='';

        var valid = true;

        /*valida os dados*/
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

            /*características da requisição*/
            var req = {
                method: 'PUT',
                url: url.concat('/empresas'),
                data: empresaForm,
                params: {id: empresaForm.id},
                headers:{
                    "Content-Type": "application/json",
                    "x-token": $cookies.get('x-token'),
                    "x-token-issued" : $cookies.get('x-token-issued')
                }
            };

            /*Respostas da requisição*/
            $http(req).then(function(data){

                $scope.mensagem_success = "Alterações realizadas com sucesso";

                $scope.loading=false;
                $modalInstance.close('cancel');
                $scope.$emit('update_list_empresa', empresa);

            })
            .catch(function(erro){
                $scope.loading=false;
                $scope.mensagem_error=erro.data.message;
            })
        } else{
            $scope.loading=false;

        }
    }
    
    /*fecha o modal*/
    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
};

