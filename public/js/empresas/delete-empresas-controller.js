angular.module('oobjclient')
	.controller('DeleteEmpresasController', function($scope, $modal, $http, $cookies, urlDominio, $window){

        $scope.$on('modalConfirmExclusaoEmpresa', function(event, mass) { 
            $scope.id = mass;
            
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

var ModalInstanceRemoveEmpresa = function ($scope, $http, $modalInstance, empresaDeleteForm,urlDominio, $cookies) {
    $scope.confirmRemoveEmpresa = function(id){
       $scope.loading=true;
       $scope.mensagem_error='';
	   $scope.mensagem_success='';
       var url = urlDominio.getUrl();

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

            $http(req).then(function(data){
            	$scope.loading=false;
            	$scope.mensagem_success='Excluído com sucesso!';
            	$scope.$emit('remove_list_empresa', id);
                $modalInstance.close('cancel');
            })
            .catch(function(erro){
                $scope.loading=false;
                $scope.mensagem_error=erro.data;
            })
    };

    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
};