/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */

/*controlador principal de empresa, para adicionar empresa, inicia listando todas as 
 * empresas
 */
angular.module('oobjclient')
	.controller('ListaEmpresasController', function($scope, $http, $cookies, urlDominio, $window){
		
		let url = urlDominio.getUrl();
		/*variáveis tow way data biding*/
		$scope.mensagem ='';
		$scope.empresas = [];

		/*características da requisição*/
		let req = {
			method: 'GET',
			url: url.concat('/empresas'),
			headers:{
				"Content-Type": "application/json",
				"x-token": $cookies.get('x-token'),
				"x-token-issued" : $cookies.get('x-token-issued')
			}
		}	

		/*envio da resquisição e resposta*/
		$http(req).then(function(response){
			$scope.empresas = response.data.body.response;
			$scope.mensagem = '';
				
		}).catch(function(erro){
			$scope.mensagem='Houve um erro ao carregar a lista, tente novamente!';
		});

		/*Usado para ordenar alguma das colunas da lista de empresas*/
		$scope.ordenar = function(keyname){
	        $scope.sortKey = keyname;
	        $scope.reverse = !$scope.reverse;
	    };

       /* Após adicionar o novo registro de empresa, esta função, recebe de outro contexto,
		* controlador, e atualiza a lista de empresa com o novo registro, sem requisições
		* excedentes a API.
        */
        $scope.$on('update_list_empresa', function(event, mass) { 
            $scope.empresas.push(mass); 
        });

       /* Ao clicar no botão de excluir empresa, trabalhamos com modal que é um contexto 
        * diferente, desta forma é usado o método $broadcast para criar um canal entre 
        * contextos diferentes e enviar o id.
        */
        $scope.showFormDelete = function(id){
        	$scope.$broadcast('modalConfirmExclusaoEmpresa', id);
        }

        /* Ao clicar no botão de editar empresa, trabalhamos com modal que é um contexto 
        * diferente, desta forma é usado o método $broadcast para criar um canal entre 
        * contextos diferentes e enviar os dados de empresa para serem alterados.
        */
        $scope.showFormEdit = function(empresa){
        	$scope.$broadcast('modalEditEmpresa', empresa);
        }

        /* Canal entre controlloers diferentes recebe a lista de empresas importadas
         * pelo xml para serem inseridas na lista já existente e renderizada.
         */
        $scope.$on('update_list_relatorio', function(event, mass) { 
            mass.forEach(function(value){
            	$scope.empresas.push(value);
            });

        });

        /* Canal entre controlloers diferentes recebe o id a partir do controller 
         * da remover empresas para retirar o ítem excluído da lista, sem necessidade
         * de requisições ao serviço da api
         */
        $scope.$on('remove_list_empresa', function(event, mass) { 
            $scope.empresas.forEach(function(item, index){
            	if(item.id === mass){
            		$scope.empresas.splice(index, 1);
            	}

            	if($scope.empresas.length < 1){
					$scope.mensagem='Nenhuma empresa cadastrada';
				}
            }) 
        });
});
