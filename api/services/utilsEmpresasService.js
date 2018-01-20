/**
 * utilsEmpresasService
 *
 * @description :: 
 */
module.exports = {
 	validateData:function(body, done){

 		if(!body.razao_social){
 			return done(false, 'Razao social is required!');
 		}

 		if(!body.cnpj_base){
 			return done(false, 'CNPJ is required!');
 		}

 		if(!body.status){
 			return done(false, 'Status is required!');
 		}

 		return done(true, null);
 	}

 }