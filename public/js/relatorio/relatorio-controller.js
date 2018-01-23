angular.module('oobjclient')
	.controller('RelatorioController', function($scope, x2js, $http, $cookies, urlDominio, $window){
		
		$scope.export = function(){
			$scope.loading=true;
			let url = urlDominio.getUrl();


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

				var filename = 'filename.xml';   
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
		}

});