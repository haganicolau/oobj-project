/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */
 /*controlador para editar uma filial*/ 
angular.module('oobjclient')
    .controller('EditFiliaisController', function($scope, CityState, $modal, $http, $cookies, urlDominio, $window){

       /* Canal entre controlloers diferentes recebe o dado da filial a partir do 
        * controller da lista de filiais
        */
        $scope.$on('modalEditFilial', function(event, mass) { 
            $scope.filial = mass;

            $scope.cidades = [];
            $scope.estados = CityState.getState();

            /*cria a relação entre os arrays json de cidade, estado e os dados 
             *já cadastrados
             */
            $scope.estados.forEach(function(item, index, array){
                if(item.Sigla === mass.uf){
                    $scope.filial.estado = item;

                    CityState.getCity().forEach(function(it, idx, arr){

                        if(it.id_estado === $scope.filial.estado.ID){
                            $scope.cidades = it.cidades;
                        } 
                    });
                } 
            });
            
            /*chama o modal para edição de empresa*/
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

        /*Ao atualizar o estado é necessário executar esta função para chamar todos os 
         * municípios daquele estado.
         */
        $scope.updateCity = function(){
            CityState.getCity().forEach(function(item, index, array){
                if(item.id_estado === $scope.filial.estado.ID){
                    $scope.cidades = item.cidades;
                    $scope.filial.uf = $scope.filial.estado.Sigla;
                }
            });
        };
});

/*Gera o formulário de edite filial*/
var ModalInstanceEditFilial = function ($scope, $http, $modalInstance, validateCNPJ, filialForm, urlDominio, $cookies) {
    $scope.mensagem_success='';

    $scope.submitFormEditFilial = function(){
        /*start spin*/
        $scope.loading=true;
        $scope.mensagem_error='';

        var valid = true;
        /*valida os dados*/
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

            /*características da requisição*/
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
            /*Envio e Respostas das requisições*/
            $http(req).then(function(data){

                $scope.mensagem_success = "Alterações realizadas com sucesso";

                $scope.loading=false;
                $modalInstance.close('cancel');
                $scope.$emit('update_list_empresa', empresa);
            })
            .catch(function(erro){
                $scope.loading=false;
                $scope.mensagem_error="Alteração não concluída! Tente novamente.";
            })
        } else{
             /*stop spin*/
             $scope.loading=false;
        }
    }
    
    /*fecha o modal*/
    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
};

