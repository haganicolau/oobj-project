angular.module('oobjclient')
	.controller('AddFiliaisController', function($scope, CityState, $modal, $http, $cookies, urlDominio, $window){

        var reader = new FileReader();
		$scope.filial = {};
        $scope.cidades = [];
        $scope.estados = CityState.getState();

		$scope.id = 0;

        /*chama o modal para cadastro de empresa*/
        $scope.showFormAdd = function(id){
            $scope.filial.empresa = id

            var modalInstance = $modal.open({
                templateUrl: '/views/filiais/new-filial.html',
                controller: ModalInstanceFilial,
                scope: $scope,
                resolve: {
                    filialForm: function () {
                        return $scope.filial;
                    }
                }
            });
        };

        $scope.updateCity = function(){
            
            CityState.getCity().forEach(function(item, index, array){
                if(item.id_estado === $scope.filial.estado.ID){
                    $scope.cidades = item.cidades;
                    $scope.filial.uf = $scope.filial.estado.Sigla;
                    console.log($scope.filial);
                }
            });

        };
});

var ModalInstanceFilial = function ($scope, $http, $modalInstance, filialForm, validateCNPJ, urlDominio, $cookies) {
    $scope.mensagem_success='';

	$scope.submitFormSaveFilial = function(){
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
                method: 'POST',
                url: url.concat('/filiais'),
                data: filialForm,
                headers:{
                    "Content-Type": "application/json",
					"x-token": $cookies.get('x-token'),
					"x-token-issued" : $cookies.get('x-token-issued')
                }
            };

            $http(req).then(function(data){
            	empresa = data.data.body.filial;
                $scope.mensagem_success = "Cadastro realizado com sucesso";
                $scope.loading = false;
                $scope.filial = {};
                $scope.$emit('update_list_filial', empresa);
            })
            .catch(function(erro){

                $scope.loading = false;
                $scope.mensagem_error = erro.data.message;;
            })
        }

        else {
            $scope.loading=false;
        }
	}

    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
};

