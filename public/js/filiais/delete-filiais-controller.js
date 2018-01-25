/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */

 /*controlador para remover filial*/
angular.module('oobjclient')
	.controller('DeleteFiliaisController', function($scope, $modal, $http, $cookies, urlDominio, $window){

        $scope.$on('modalConfirmExclusaoFilial', function(event, mass) { 
            $scope.id = mass.id;
            $scope.length = mass.length;
            
            /*chama o modal para exclusão de filial*/
            var modalInstance = $modal.open({
                templateUrl: '/views/filiais/confirm-delete-filial.html',
                controller: ModalInstanceRemoveFilial,
                scope: $scope,
                resolve: {
                    filialDeleteForm: function () {
                        return $scope;
                    }
                }
            });
        });

        /* Necessário validar, se existir apenas uma única filial, a mesma não pode ser 
         * excluída, deve existir ao menos uma filial vinculada
         */
       $scope.validForm = function(){

            /*$scope.length: quantidade de filiais vinculado a empresa*/
            if($scope.length ===1){
                $scope.mensagem_warn = "Não pode excluir Filial, empresa deve ter ao menos uma filial cadastrada.";
                return true;
            } else{
                $scope.mensagem_warn = '';
                return false;
            }
        }
});

/*Gera o formulário de exclusão filial*/
var ModalInstanceRemoveFilial = function ($scope, $http, $modalInstance, filialDeleteForm,urlDominio, $cookies) {
    
    /*Ao confirmar a exclusão, esta função é chamada*/
    $scope.confirmRemoveFilial = function(id){

       /*spin ativado*/ 
       $scope.loading=true;
       $scope.mensagem_error='';
	   $scope.mensagem_success='';
       var url = urlDominio.getUrl();


       /*características das requisições*/
       var req = {
                method: 'DELETE',
                url: url.concat('/filiais'),
                params: {id: id},
                headers:{
                    "Content-Type": "application/json",
					"x-token": $cookies.get('x-token'),
					"x-token-issued" : $cookies.get('x-token-issued')
                }
            };

            /*requisição de excluir filial*/
            $http(req).then(function(data){
            	$scope.loading=false;
            	$scope.mensagem_success='Excluído com sucesso!';


                /* Ao finalizar a requisição e remover a filial, é preciso remover o mesmo 
                 * da lista, esta função devolve para o contexto de listagem 
                 */
            	$scope.$emit('remove_list_filial', id);
                $modalInstance.close('cancel');
           
            }).catch(function(erro){
                $scope.loading=false;
                $scope.mensagem_error=erro.data.message;
            })
    };

    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
};