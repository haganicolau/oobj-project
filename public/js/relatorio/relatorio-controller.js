angular.module('oobjclient')
	.controller('RelatorioController', function($scope, $modal, x2js, $http, $cookies, urlDominio, $window){
		let url = urlDominio.getUrl();

		$scope.export = function(){
			$scope.loading=true;
			
			let req = {
				method: 'GET',
				url: url.concat('/relatorio/export'),
				headers:{
					"Content-Type": "application/json",
					"x-token": $cookies.get('x-token'),
					"x-token-issued" : $cookies.get('x-token-issued')
				}
			}	

			$http(req).then(function(response){
                dados = response.data.body.empresas;
                let x2js = new X2JS();
                xmlAsStr = '';
                
                angular.forEach(dados, function(value, key){
                    xmlAsStr = xmlAsStr + '<empresa>' + x2js.json2xml_str(value) + '</empresa>';
                });

                xmlAsStr = '<empresas>' + xmlAsStr + '</empresas>';
				xmlAsStr = "<?xml version='1.0' encoding='UTF-8'?>" + xmlAsStr;

				var filename = 'report.xml';   
        		var blob = new Blob([xmlAsStr], {type: 'text/xml'});
        		var e = document.createEvent('MouseEvents'),
        		a = document.createElement('a');
	            a.download = filename;
	            a.href = window.URL.createObjectURL(blob);
	            a.dataset.downloadurl = ['text/xml', a.download, a.href].join(':');
	            e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	            a.dispatchEvent(e);
				
				$scope.loading=false;
			}).catch(function(erro){
				$scope.mensagem_error='Houve um erro ao tentar gerar o relatorio!';
			});
		};

		$scope.showFormUpload = function(){
			var modalInstance = $modal.open({
                templateUrl: '/views/relatorio/modal-uploadfile.html',
                controller: ModalInstanceUpload,
                scope: $scope,
                resolve: {
                    uploadForm: function () {
                        return $scope.empresa={empresa: $scope.empresa};
                    }
                }
            });
		}
});

var ModalInstanceUpload = function ($window, $scope, $http, $modalInstance, uploadForm, urlDominio, $cookies) {
	var json = [];
	$scope.statusFile ='';
	$scope.typeStatus ='';
	$scope.validFile = true;
	var isValid = true;

	$scope.showContent = function($fileContent){

		$scope.statusFile='Aguarde um momento';
		$scope.typeStatus='warning';

		let x2js = new X2JS();
		json = x2js.xml_str2json($fileContent);
		if(!json){
			$scope.statusFile='Arquivo não é válido!';
			$scope.typeStatus='danger';
		} else{
			$scope.statusFile='Arquivo válido!';
			$scope.typeStatus='info'
			isValid = false;
			$scope.validFile();
		}
	}

	$scope.validFile = function(resposta){
		return isValid;
	}

    $scope.cancel = function () {
    	$modalInstance.close('cancel');   
    };

	$scope.sendFile = function(){
		var url = urlDominio.getUrl();
		$scope.loading=true;
		let req = {
			method: 'POST',
			url: url.concat('/relatorio/import'),
			data: json,
			headers:{
				"Content-Type": "application/json",
				"x-token": $cookies.get('x-token'),
				"x-token-issued" : $cookies.get('x-token-issued')
			}
		}	
			
			$http(req).then(function(response){

				$scope.statusFile='Sistema Atualizado com sucesso!';
				$scope.typeStatus='success';
				$scope.loading=false;
				$scope.$emit('update_list_relatorio', json.empresas.empresa);

			}).catch(function(erro){

				$scope.statusFile='Ao enviar o arquivo houve um erro, se erro persistir contate o suporte!';
				$scope.typeStatus='danger';
				$scope.loading=false

			});
	}
}

