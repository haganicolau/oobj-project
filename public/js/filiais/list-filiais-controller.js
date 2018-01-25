/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */

/* controlador principal de filial, para adicionar filial, inicia lista com todas as 
 * filiais daquela respectiva empresa. 
 */
angular.module('oobjclient')
    .controller('ListFiliaisController', function($scope, CityState, $routeParams, $modal, $http, $cookies, urlDominio, $window){

        $scope.filiais = [];
        $scope.empresa = {};
        $scope.mensagem_error = '';

        var id_empresa = $routeParams.empresa;

        let url = urlDominio.getUrl();

        /*caracteristica das requisições de filiais*/
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

        /*características da requisição de empresas*/
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

        /*Envio da requisição */
        $http(req_empresa).then(function(response){
            $scope.empresa = response.data.body.response;
                
        }).catch(function(erro){
            $scope.mensagem_error='Houve um erro ao carregar a lista, tente novamente!';
        });   

       /* Após adicionar o novo registro de filial, esta função, recebe de outro contexto,
        * controlador, e atualiza a lista de filiais com o novo registro, sem requisições
        * excedentes a API.
        */
        $scope.$on('update_list_filial', function(event, mass) { 
            $scope.empresa.cadastro_completo = true;
            $scope.filiais.push(mass); 
        });

        $scope.showFormDelete = function(id){
            $scope.$broadcast('modalConfirmExclusaoFilial', {id:id, length: $scope.filiais.length});
        }

       /* Canal entre controlloers diferentes recebe o id a partir do controller 
        * de remover filial e para retirar o ítem excluído da lista, sem necessidade
        * de requisições ao serviço da api
        */
        $scope.$on('remove_list_filial', function(event, mass) { 
            $scope.filiais.forEach(function(item, index){
                if(item.id === mass){
                    $scope.filiais.splice(index, 1);
                }
            }) 
        });

        /* Ao clicar no botão de editar filial, trabalhamos com modal que é um contexto 
        * diferente, desta forma é usado o método $broadcast para criar um canal entre 
        * contextos diferentes e enviar os dados de filial para serem alterados.
        */
        $scope.showFormEdit = function(filial){
            $scope.$broadcast('modalEditFilial', filial);
        }

});