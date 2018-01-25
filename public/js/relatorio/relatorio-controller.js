/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */

/* controlador principal de filial, para adicionar filial, inicia lista com todas as 
 * filiais daquela respectiva empresa. 
 */
angular.module('oobjclient')
	.controller('RelatorioController', function($scope, $modal, x2js, $http, $cookies, urlDominio, $window){
		let url = urlDominio.getUrl();

		$scope.export = function(){
			/*ativa o spin*/
			$scope.loading=true;
			
			/*características da requisições*/
			let req = {
				method: 'GET',
				url: url.concat('/relatorio/export'),
				headers:{
					"Content-Type": "application/json",
					"x-token": $cookies.get('x-token'),
					"x-token-issued" : $cookies.get('x-token-issued')
				}
			}	

			/*execução da requisição*/
			$http(req).then(function(response){
                dados = response.data.body.empresas;
                /*x2js é uma biblioteca que executa convesão XML*/
                let x2js = new X2JS();
                xmlAsStr = '';
                
                /* É criado uma única string com cada objeto, concatenando as tags xml's 
                 * que vão sendo geradas. 
                 */
                angular.forEach(dados, function(value, key){
                    xmlAsStr = xmlAsStr + '<empresa>' + x2js.json2xml_str(value) + '</empresa>';
                });

                /*cabeçalho xml*/
                xmlAsStr = '<empresas>' + xmlAsStr + '</empresas>';
				xmlAsStr = "<?xml version='1.0' encoding='UTF-8'?>" + xmlAsStr;

				/*gerar arquivo report.xml e baixar para o usuário*/
				var filename = 'report.xml';   
        		var blob = new Blob([xmlAsStr], {type: 'text/xml'});
        		var e = document.createEvent('MouseEvents'),
        		a = document.createElement('a');
	            a.download = filename;
	            a.href = window.URL.createObjectURL(blob);
	            a.dataset.downloadurl = ['text/xml', a.download, a.href].join(':');
	            e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	            a.dispatchEvent(e);
				
				/*desativa o spin*/
				$scope.loading=false;
			}).catch(function(erro){
				$scope.mensagem_error='Houve um erro ao tentar gerar o relatorio!';
			});
		};

		/*função para gerar o formulário*/
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

	/*executa a diretiva para efetuar o download do arquivo e lê-lo como texto*/
	$scope.showContent = function($fileContent){

		$scope.statusFile='Aguarde um momento';
		$scope.typeStatus='warning';

		let x2js = new X2JS();
		json = x2js.xml_str2json($fileContent);

		/* Se o arquivo for um xml válido, ele irá gerar um array, se não for, irá gerar 
		 * uma variável undifined
		 */
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

	/* verifica se o arquivo é válido, se não for, desativa o botão para não submitar 
	 * o formulário
	 */
	$scope.validFile = function(resposta){
		return isValid;
	}

	/*fecha o modal*/
    $scope.cancel = function () {
    	$modalInstance.close('cancel');   
    };

    /*submit para enviar o formulário*/
	$scope.sendFile = function(){
		var url = urlDominio.getUrl();
		$scope.loading=true;

		/*características da requisição*/
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
			/*envia a requisição*/
			$http(req).then(function(response){

				$scope.statusFile='Sistema Atualizado com sucesso!';
				$scope.typeStatus='success';
				$scope.loading=false;

				/* Após importado as novas empresas e enviado para o banco, deve-se 
				 * atualizar a lista renderizada na página de listas de empresas. Esta 
				 * função abaixo cria uma comunicação entre os contextos dos controllers
				 * e envia o conjunto de empresas para atualizar a lista. 
				 */
				$scope.$emit('update_list_relatorio', json.empresas.empresa);

			}).catch(function(erro){

				$scope.statusFile='Ao enviar o arquivo houve um erro, se erro persistir contate o suporte!';
				$scope.typeStatus='danger';
				$scope.loading=false

			});
	}
}

