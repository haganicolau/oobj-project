/**
 * utilsFiliaisService
 *
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 * @description :: valida os dados de filial
 */
 

/*verifica se cnpj é válido*/
 function validateCNPJ(cnpj){
	cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
}

/*Verifica se dados são válidos*/
module.exports = {
 	validateData:function(body, done){

 		if(!body.cnpj)
 			return done(false, 'CNPJ is required!');

 		if(!body.status)
 			return done(false, 'Status is required!');

 		if(!body.municipio)
 			return done(false, 'Município is required!');

 		if(!body.uf)
 			return done(false, 'UF is required!');

 		if(!body.categoria)
 			return done(false, 'Categoria is required!');

 		if(!body.empresa)
 			return done(false, 'empresa is required')

 		if(!validateCNPJ(body.cnpj))
 			return done(false, 'Invalid cnpj');

 		return done(true, null);
 	}

 }