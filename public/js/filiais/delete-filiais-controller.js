angular.module('oobjclient')
	.controller('DeleteFiliaisController', function($scope, $modal, $http, $cookies, urlDominio, $window){

        $scope.$on('modalConfirmExclusaoFilial', function(event, mass) { 
            $scope.id = mass;
            
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
            })
            .catch(function(erro){
                $scope.loading=false;
                $scope.mensagem_error=erro.data.message;;
            })
    };

    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
};