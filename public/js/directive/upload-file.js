/**
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 */

 /*Diretiva para upload de arquivos*/
angular.module('oobjclient')
        .directive('onReadFile', function ($parse) {
      return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
          var fn = $parse(attrs.onReadFile);
     
          /*Ao mudar o arquivo ação já será executada*/
          element.on('change', function(onChangeEvent) {
            var reader = new FileReader();
     
            reader.onload = function(onLoadEvent) {
              scope.$apply(function() {
                fn(scope, {$fileContent:onLoadEvent.target.result});
              });
            };
            /*Le o aquivo como texto*/
            reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
      });
    }
  };
});

