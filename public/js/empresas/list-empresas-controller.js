angular.module('oobjclient')
	.controller('ListaEmpresasController', function($scope, $http, $cookies, urlDominio, $window){
		
		let url = urlDominio.getUrl();
		$scope.mensagem ='';
		$scope.empresas = [];

		let req = {
			method: 'GET',
			url: url.concat('/empresas'),
			headers:{
				"Content-Type": "application/json",
				"x-token": $cookies.get('x-token'),
				"x-token-issued" : $cookies.get('x-token-issued')
			}
		}	

		$http(req).then(function(response){
			$scope.empresas = response.data.body.response;
			$scope.mensagem = '';
				
		}).catch(function(erro){
			$scope.mensagem='Houve um erro ao carregar a lista, tente novamente!';
		});

		$scope.ordenar = function(keyname){
	        $scope.sortKey = keyname;
	        $scope.reverse = !$scope.reverse;
	    };

     	$scope.onSelectChange = function(){

     	};

        $scope.$on('update_list_empresa', function(event, mass) { 
            $scope.empresas.push(mass); 
        });

        $scope.showFormDelete = function(id){
        	$scope.$broadcast('modalConfirmExclusaoEmpresa', id);
        }

        $scope.showFormEdit = function(empresa){
        	$scope.$broadcast('modalEditEmpresa', empresa);
        }

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
