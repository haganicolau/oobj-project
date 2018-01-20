/**
 * EController
 *
 * @description :: Server-side logic for managing ES
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var ObjectId = require('bson-objectid');

module.exports = {
	
	index: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			res.status(203).json('not allowed');
		
		Empresas.find()
			
			.then((response) => {
				res.json(response);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	},

	create: (req, res) => {
		if(!authService.authenticateUserToken(req, res)) 
			res.status(203).json('not allowed');

		let data = req.body;
		utilsEmpresasService.validateData(data, function(status, message){

			if(!status){
				res.status(401).json(message);
			}

			Empresas.create({
				razao_social : data.razao_social,
				cnpj_base    : data.cnpj_base,
				status       : data.status,
			
			}).then((data) => {
				res.status(201).json(data);
			}).catch((err) => {
				res.status(401).json(err);
			})

		});
	},

	delete: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			res.status(203).json('not allowed');

		let _id = req.param('_id');

		/*Exclusão lógica*/
		Empresas.update(_id, {'status': false})

			.then((data)=>{
				res.status(202).json('empresa deleted');
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

		utilsEmpresasService.validateData(data, function(status, message){

			if(!status){
				res.status(401).json(message);
			}

			Empresas.update(_id, {
				razao_social : data.razao_social,
				cnpj_base    : data.cnpj_base,
				status       : data.status,
			
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

		if(filter == 'cnpj_base'){
			where = {'cnpj_base' : value};
		}

		if(filter == 'razao_social'){
			where = {'razao_social' : '%'+value+'%'};
		}

		Empresas.find({
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

		Empresas.findById(req.param('_id'), function(err, response){

			if(err){
				res.status(401).json(err);
			}

			res.json(response);
		});
			
	}
};

