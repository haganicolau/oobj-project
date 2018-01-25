angular.module('oobjclient')
    .controller('ListFiliaisController', function($scope, CityState, $routeParams, $modal, $http, $cookies, urlDominio, $window){

        $scope.filiais = [];
        $scope.empresa = {};
        $scope.mensagem_error = '';

        var id_empresa = $routeParams.empresa;

        let url = urlDominio.getUrl();

        /*Popular lista de filiais*/
        let req_filial = {
            method: 'GET',
            url: url.concat('/filiais'),
            params: {empresa: id_empresa},
            headers:{
                "Content-Type": "application/json",
                "x-token": $cookies.get('x-token'),
                "x-token-issued" : $cookies.get('x-token-issued')
            }
        }

        $http(req_filial).then(function(response){
            $scope.filiais = response.data.body.response;
            
                
        }).catch(function(erro){
            $scope.mensagem_error='Houve um erro ao carregar a lista, tente novamente!';
        }); 

        /*popular registro de empresa*/  
        let req_empresa = {
            method: 'GET',
            url: url.concat('/empresas/findOne'),
            params: {id: id_empresa},
            headers:{
                "Content-Type": "application/json",
                "x-token": $cookies.get('x-token'),
                "x-token-issued" : $cookies.get('x-token-issued')
            }
        }

        $http(req_empresa).then(function(response){
            $scope.empresa = response.data.body.response;
                
        }).catch(function(erro){
            $scope.mensagem_error='Houve um erro ao carregar a lista, tente novamente!';
        });   

        $scope.$on('update_list_filial', function(event, mass) { 
            $scope.empresa.cadastro_completo = true;
            $scope.filiais.push(mass); 
        });

        $scope.showFormDelete = function(id){
            $scope.$broadcast('modalConfirmExclusaoFilial', {id:id, length: $scope.filiais.length});
        }

        $scope.$on('remove_list_filial', function(event, mass) { 
            $scope.filiais.forEach(function(item, index){
                if(item.id === mass){
                    $scope.filiais.splice(index, 1);
                }
            }) 
        });

        $scope.showFormEdit = function(filial){
            $scope.$broadcast('modalEditFilial', filial);
        }

});