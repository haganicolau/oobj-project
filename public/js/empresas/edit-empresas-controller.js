angular.module('oobjclient')
    .controller('EditEmpresasController', function($scope, $modal, $http, $cookies, urlDominio, $window){

        $scope.$on('modalEditEmpresa', function(event, mass) { 
            $scope.empresa = mass;
            
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

var ModalInstanceEditEmpresa = function ($scope, $http, $modalInstance, empresaForm, urlDominio, $cookies) {
    $scope.mensagem_success='';

    $scope.submitFormEditEmpresa = function(){
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

            $http(req).then(function(data){

                $scope.mensagem_success = "Alterações realizadas com sucesso";
                console.log($scope.mensagem_success);
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

