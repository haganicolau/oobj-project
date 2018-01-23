angular.module('oobjclient')
    .controller('EditFiliaisController', function($scope, $modal, $http, $cookies, urlDominio, $window){

        $scope.$on('modalEditFilial', function(event, mass) { 
            $scope.filial = mass;
            console.log($scope.filial);
            
            var modalInstance = $modal.open({
                templateUrl: '/views/filiais/edit-filial.html',
                controller: ModalInstanceEditFilial,
                scope: $scope,
                resolve: {
                    filialForm: function () {
                        return $scope.filial;
                    }
                }
            });
        });
});

var ModalInstanceEditFilial = function ($scope, $http, $modalInstance, validateCNPJ, filialForm, urlDominio, $cookies) {
    $scope.mensagem_success='';

    $scope.submitFormEditFilial = function(){
        $scope.loading=true;
        $scope.mensagem_error='';

        var valid = true;

        if(!filialForm.cnpj){
            $scope.mensagem_error='Informe CNPJ';
            valid = false;
        
        } else{

            if(!validateCNPJ.validarCNPJ(filialForm.cnpj)){
                $scope.mensagem_error='CNPJ Inválido, favor corrigí-lo';
                valid = false;
            }
        }

        if(!filialForm.uf){
            $scope.mensagem_error='Informe UF';
            valid = false;
        }

        if(!filialForm.municipio){
            $scope.mensagem_error='Informe um municipio';
            valid = false;
        }

        if(!filialForm.status){
            $scope.mensagem_error='Selecione um status';
            valid = false;
        }

        if(!filialForm.categoria){
            $scope.mensagem_error='Selecione uma categoria';
            valid = false;
        }

        if(valid){
            var url = urlDominio.getUrl();

            var req = {
                method: 'PUT',
                url: url.concat('/filiais'),
                data: filialForm,
                params: {id: filialForm.id},
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

