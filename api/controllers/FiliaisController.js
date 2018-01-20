/**
 * FiliaisController
 *
 * @description :: Server-side logic for managing filiais
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	index: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		Filiais.find({empresa : req.param('empresa')})
			
			.then((response) => {
				return res.status(200).json({status:'success', body:{response}});
			})
			.catch((err) => {
				return res.status(500).json({status:'fail', message:err});
			});
	},

	create: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		let data = req.body;

		utilsFiliaisService.validateData(data, function(status, message){

			if(!status)
				return res.status(401).json({status:'fail', message:message});

			Empresas.findById(data.empresa, function(err, response){

				if(err)
					return res.status(401).json({status:'fail', message:'Empresa not found'});

				Filiais.create({
					categoria : data.categoria,
					municipio : data.municipio,
					empresa   : response[0].id,
					status    : data.status,
					cnpj      : data.cnpj,
					uf        : data.uf,
					
				}).then((data) => {
					return res.status(201).json({status:'success', body:null});
				}).catch((err) => {
					return res.status(401).json({status:'fail', message:err});
				})
			});
		});
	},

	delete: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		let _id = req.param('_id');

		/*Exclusão lógica*/
		Filiais.update(_id, {'status': false})

			.then((data)=>{
				return res.status(202).json({status:'success', body:null});
			})
			.catch((err)=>{
				return res.status(401).json({status:'fail', message:err});
			});

	},

	update: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		let _id = req.param('_id');
		let data = req.body;

		utilsFiliaisService.validateData(data, function(status, message){

			if(!status)
				return res.status(401).json({status:'fail', message:message});

			Filiais.update(_id, {
				categoria : data.categoria,
				municipio : data.municipio,
				empresa   : data.empresa,
				status    : data.status,
				cnpj      : data.cnpj,
				uf        : data.uf,
			
			})

			.then((data)=>{
				return res.status(202).json({status:'success', body:null});
			})
			.catch((err)=>{
				return res.status(401).json({status:'fail', messsage:err});
			});

		});
	},

	search: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		let filter = req.param('filter').toString();
		let value = req.param('value');
		let where = {};

		if(!filter)
			return res.status(401).json({status:'fail', message:'filter is required'});

		if(!value)
			return res.status(401).json({status:fail, message:'value is required'});

		if(filter == 'status')
			where = {'status' : value};

		if(filter == 'cnpj')
			where = {'cnpj' : value};

		if(filter == 'uf')
			where = {'uf' : value};

		if(filter == 'municipio')
			where = {'municipio' : value};

		if(filter == 'categoria')
			where = {'categoria' : value};

		Filiais.find({
			where
		})
			.then((response) => {
				return res.status(200).json({status:'success', body:{response}});
			})
			.catch((err) => {
				return res.status(500).json({status:'fail', message:err});
			});
	},

	findOne: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res))
			return res.status(203).json({status:'fail', message:'not allowed'});

		if(!req.param('_id'))
			return res.status(401).json({status:'fail', message:'_id is required'});


		Filiais.findById(req.param('_id'), function(err, response){

			if(err)
				return res.status(401).json({status:'fail', message:err});

			return res.status(200).json({status:'success', body:{response}});
		});
			
	}
};

