angular.module("oobjclient").directive("phoneDir", PhoneDir);

function PhoneDir() {
  return {
    link : function(scope, element, attrs) {
        var options = {
            onKeyPress: function(val, e, field, options) {
                putMask();
            }
        }

        $(element).mask('(00) 00000-0000', options);

        function putMask() {
            var mask;
            var cleanVal = element[0].value.replace(/\D/g, '');//pega o valor sem mascara
            if(cleanVal.length > 10) {//verifica a quantidade de digitos.
                mask = "(00) 00000-0000";
            } else {
                mask = "(00) 0000-00009";
            }
            $(element).mask(mask, options);//aplica a mascara novamente
        }
    }
  }
};

angular.module("oobjclient").directive("cnpjDir", CnpjDir);

function CnpjDir() {
   return {
    link : function(scope, element, attrs) {
        var options = {
            onKeyPress: function(val, e, field, options) {
                putMask();
            }
        }

        $(element).mask('00.000.000/0000-00', options);

        function putMask() {
            var mask;
            var cleanVal = element[0].value.replace(/\D/g, '');//pega o valor sem mascara

            mask = "00.000.000/0000-00";
            $(element).mask(mask, options);//aplica a mascara novamente
        }
    }
  }
}

angular.module("oobjclient").directive("cnpjBaseDir", CnpjBaseDir);

function CnpjBaseDir() {
   return {
    link : function(scope, element, attrs) {
        var options = {
            onKeyPress: function(val, e, field, options) {
                putMask();
            }
        }

        $(element).mask('00.000.000', options);

        function putMask() {
            var mask;
            var cleanVal = element[0].value.replace(/\D/g, '');//pega o valor sem mascara

            mask = "00.000.000";
            $(element).mask(mask, options);//aplica a mascara novamente
        }
    }
  }
}

angular.module("oobjclient").directive("birthDir", BirthDir);

function BirthDir() {
   return {
    link : function(scope, element, attrs) {
        var options = {
            onKeyPress: function(val, e, field, options) {
                putMask();
            }
        }

        $(element).mask('99/99/9999', options);

        function putMask() {
            var mask;
            var cleanVal = element[0].value.replace(/\D/g, '');//pega o valor sem mascara

            mask = "99/99/9999";
            $(element).mask(mask, options);//aplica a mascara novamente
        }
    }
  }
}