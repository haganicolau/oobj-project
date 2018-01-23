/**
 * RelatorioController
 *
 * @description :: 
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var ObjectId = require('bson-objectid');
var empty = require('is-empty');

module.exports = {

	export: (req, res) => {
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});
		empresas = [];

		Empresas.find()
			.then((empresasBD) => {

				empresasBD.forEach(function(item, index, array){

					Filiais.find({empresa : item.id})
						.then((filiais) => {

							item.filiais = filiais;
							empresas.push(item);


							if(empresas.length === array.length ){
								return res.status(200).json({status:'success', body:{empresas}});
							}

					}).catch((err) => {
						return res.status(500).json({status:'fail', message:err});
					});
					

				});
			})
			.catch((err) => {
				return res.status(500).json({status: 'fail', messsage:err});
			});
	},

	import: (req, res) => {
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});
		
		let data = req.body;
		data = data.empresas.empresa;
		auxFiliais = [];
		contadorFiliais = 0;


		data.forEach(function(item, index, array){

			utilsEmpresasService.validateData(item, function(status, message){

				if(!status)
					return res.status(401).json({status:'fail', message:"Documento inválido"});

				Empresas.create({
					razao_social : item.razao_social,
					cnpj_base    : item.cnpj_base,
					status       : item.status,
				
				}).then((resp) => {

					auxFiliais.push(resp.filiais);
							
					if(item.filiais.length > 0){

						item.filiais.forEach(function(it, idx, arr){

							utilsFiliaisService.validateData(it, function(status, message){
								if(!status)
									return res.status(401).json({status:'fail', message:message});

								Filiais.create({
									categoria : it.categoria,
									municipio : it.municipio,
									empresa   : resp.id,
									status    : it.status,
									cnpj      : it.cnpj,
									uf        : it.uf,
									
								}).then((data) => {
									
									contadorFiliais++;
									if(contadorFiliais === auxFiliais.length){
										return res.status(200).json({status:'success'});
									}

								}).catch((err) => {
									return res.status(401).json({status:'fail', message:err});
								})

							});

						})
					}

				}).catch((err) => {
					return res.status(401).json({status:'fail', message:err});
				})

			});

		});

	}
}