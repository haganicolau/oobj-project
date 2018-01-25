/**
 * EmpresaController
 *
 *
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 * @description :: Funções responsáveis por interagir com base de dados do modelo 
 * Empresas. 
 */

/*Dependências*/
var ObjectId = require('bson-objectid');

module.exports = {
	/*Método executado pela rota GET que obem a lista de empresas*/
	index: (req, res) => {

		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});
		/*Obtém os dados do banco, se der tudo certo retorna sucesso, se der errado retorna a falha*/
		Empresas.find()
			
			.then((response) => {
				return res.status(200).json({status:'success', body:{response}});
			})
			.catch((err) => {
				return res.status(500).json({status: 'fail', messsage:err});
			});
	},

	/*Método executado pela rota POST para enviar os dados de empresa*/
	create: (req, res) => {

		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		/*Obtém os dados passado no corpo da requisição*/
		let data = req.body;

		/*Método usado para validar os dados do corpo da requicição*/
		utilsEmpresasService.validateData(data, function(status, message){

			if(!status)
				return res.status(401).json({status:'fail', message:message});

			/*Insere os dados*/
			Empresas.create({
				razao_social 	  : data.razao_social,
				cnpj_base    	  : data.cnpj_base,
				status       	  : data.status,
				cadastro_completo : false
			
			}).then((data) => {
				return res.status(201).json({status:'success', body:{data}});
			}).catch((err) => {
				return res.status(401).json({status:'fail', message:err});
			})

		});
	},

	/*Exclusão de empresas, porém, existe uma regra que após exclusão de uma empresa, todas as filiais devem ser descartadas também. */
	delete: (req, res) => {

		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		/*Obtém o dado que será passado por parâmetro*/
		let _id = req.param('id');

		/*Exclusão de todas as filiais*/
		Filiais.destroy({
			empresa: _id
		}).exec(function(err) {
			if(err)
				return res.status(401).json({status:'fail', message:err});

					/*Exclusão Empresas*/
					Empresas.destroy({
						id: _id
					
					}).exec(function(err) {
						if(err)
							return res.status(401).json({status:'fail', message:err});

						return res.status(202).json({status:'success', body:null});
					});
		});
	},

	update: (req, res) => {

		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		/*Obtém o dado que será passado por parâmetro*/
		let _id = req.param('id');

		/*Obtém os dados passado no corpo da requisição*/
		let data = req.body;

		/*Alteração no banco*/
		utilsEmpresasService.validateData(data, function(status, message){

			if(!status)
				return res.status(401).json({status:'fail', message:message});

			Empresas.update(_id, {
				razao_social : data.razao_social,
				cnpj_base    : data.cnpj_base,
				status       : data.status,
			
			})

			.then((data)=>{
				return res.status(202).json({status:'success', body:null});
			})
			.catch((err)=>{
				return res.status(401).json({status:'fail', message:err});
			});

		});
	},

	/*Busa de uma única empresa*/
	findOne: (req, res) => {

		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res))
			return res.status(203).json({status:'fail', message:'not allowed'});

		/*Obtém o dado que será passado por parâmetro*/
		if(!req.param('id'))
			return res.status(401).json({status:'fail', message:'_id is required'});

		Empresas.findById(req.param('id'), function(err, response){

			if(err)
				return res.status(401).json({status:'fail', message:err});
			
			response = response[0];
			res.status(200).json({status:'success', body:{response}});
		});
			
	}
};

