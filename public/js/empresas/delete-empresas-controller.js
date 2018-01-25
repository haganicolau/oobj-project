/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */

 /*controlador para remover uma empresa*/
angular.module('oobjclient')
	.controller('DeleteEmpresasController', function($scope, $modal, $http, $cookies, urlDominio, $window){

        /* Canal entre controlloers diferentes recebe o id a partir do controller 
         * da lista de empresas
         */
        $scope.$on('modalConfirmExclusaoEmpresa', function(event, mass) { 
            $scope.id = mass;
            
            /*chama o modal para exclusão de empresa*/
            var modalInstance = $modal.open({
                templateUrl: '/views/empresas/confirm-delete-empresa.html',
                controller: ModalInstanceRemoveEmpresa,
                scope: $scope,
                resolve: {
                    empresaDeleteForm: function () {
                        return $scope.empresa;
                    }
                }
            });
        });
});

/*Gera o formulário de exclusão empresa*/
var ModalInstanceRemoveEmpresa = function ($scope, $http, $modalInstance, empresaDeleteForm,urlDominio, $cookies) {
   
    /*Ao confirmar a exclusão, esta função é chamada*/
    $scope.confirmRemoveEmpresa = function(id){
       /*spin ativado*/
       $scope.loading=true;

       $scope.mensagem_error='';
	   $scope.mensagem_success='';
       var url = urlDominio.getUrl();

       /*características das requisições*/
       var req = {
                method: 'DELETE',
                url: url.concat('/empresas'),
                params: {id: id},
                headers:{
                    "Content-Type": "application/json",
					"x-token": $cookies.get('x-token'),
					"x-token-issued" : $cookies.get('x-token-issued')
                }
            };

            /*requisição de excluir empresa*/
            $http(req).then(function(data){
            	$scope.loading=false;
            	$scope.mensagem_success='Excluído com sucesso!';

                /*Ao finalizar a requisição e remover a empresa, é preciso remover o mesmo da 
                 *lista, esta função devolve para o contexto de listagem 
                 */
            	$scope.$emit('remove_list_empresa', id);
                $modalInstance.close('cancel');
            })
            .catch(function(erro){
                $scope.loading=false;
                $scope.mensagem_error=erro.data.message;
            })
    };

    /*fechar modal*/
    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
};