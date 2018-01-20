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
			res.status(203).json('not allowed');

		Filiais.find({empresa : req.param('empresa')})
			
			.then((response) => {
				res.json(response);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	},

	create: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			res.status(203).json('not allowed');

		let data = req.body;

		utilsFiliaisService.validateData(data, function(status, message){

			if(!status){
				res.status(401).json(message);
			}

			Empresas.findById(data.empresa, function(err, response){

				if(err){
					res.status(401).json('Empresa not found');
				}

				Filiais.create({
					categoria : data.categoria,
					municipio : data.municipio,
					empresa   : response[0].id,
					status    : data.status,
					cnpj      : data.cnpj,
					uf        : data.uf,
					
				}).then((data) => {
					res.status(201).json(data);
				}).catch((err) => {
					res.status(401).json(err);
				})
			});
		});
	},

	delete: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			res.status(203).json('not allowed');

		let _id = req.param('_id');

		/*Exclusão lógica*/
		Filiais.update(_id, {'status': false})

			.then((data)=>{
				res.status(202).json('Filial deleted');
			})
			.catch((err)=>{
				res.status(401).json(err);
			});

	},

	update: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			res.status(203).json('not allowed');

		let _id = req.param('_id');
		let data = req.body;

		utilsFiliaisService.validateData(data, function(status, message){

			if(!status){
				res.status(401).json(message);
			}

			Filiais.update(_id, {
				categoria : data.categoria,
				municipio : data.municipio,
				empresa   : data.empresa,
				status    : data.status,
				cnpj      : data.cnpj,
				uf        : data.uf,
			
			})

			.then((data)=>{
				res.status(202).json('empresa updated');
			})
			.catch((err)=>{
				res.status(401).json(err);
			});

		});
	},

	search: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			res.status(203).json('not allowed');

		let filter = req.param('filter').toString();
		let value = req.param('value');
		let where = {};

		if(!filter){
			res.status(401).json('filter is required');
		}

		if(!value){
			res.status(401).json('value is required');
		}

		if(filter == 'status'){
			where = {'status' : value};
		}

		if(filter == 'cnpj'){
			where = {'cnpj' : value};
		}

		if(filter == 'uf'){
			where = {'uf' : value};
		}

		if(filter == 'municipio'){
			where = {'municipio' : value};
		}

		if(filter == 'categoria'){
			where = {'categoria' : value};
		}

		Filiais.find({
			where
		})
			.then((response) => {
				res.json(response);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	},

	findOne: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)){
			res.status(203).json('not allowed');
		}

		if(!req.param('_id')){
			res.status(401).json('_id is required');
		}

		Filiais.findById(req.param('_id'), function(err, response){

			if(err){
				res.status(401).json(err);
			}

			res.json(response);
		});
			
	}
};

