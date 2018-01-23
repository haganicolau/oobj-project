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
	}
}