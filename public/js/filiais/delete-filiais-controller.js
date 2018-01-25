angular.module('oobjclient')
	.controller('DeleteFiliaisController', function($scope, $modal, $http, $cookies, urlDominio, $window){

        $scope.$on('modalConfirmExclusaoFilial', function(event, mass) { 
            $scope.id = mass.id;
            $scope.length = mass.length;
            
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

       $scope.validForm = function(){

            if($scope.length ===1){
                $scope.mensagem_warn = "Não pode excluir Filial, empresa deve ter ao menos uma filial cadastrada.";
                return true;
            } else{
                $scope.mensagem_warn = '';
                return false;
            }
        }
});

var ModalInstanceRemoveFilial = function ($scope, $http, $modalInstance, filialDeleteForm,urlDominio, $cookies) {
    $scope.confirmRemoveFilial = function(id){

       $scope.loading=true;
       $scope.mensagem_error='';
	   $scope.mensagem_success='';
       var url = urlDominio.getUrl();



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

            $http(req).then(function(data){
            	$scope.loading=false;
            	$scope.mensagem_success='Excluído com sucesso!';

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