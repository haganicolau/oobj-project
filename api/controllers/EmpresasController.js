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
			return res.status(203).json({status:'fail', message:'not allowed'});
		
		Empresas.find()
			
			.then((response) => {
				return res.status(200).json({status:'success', body:{response}});
			})
			.catch((err) => {
				return res.status(500).json({status: 'fail', messsage:err});
			});
	},

	create: (req, res) => {
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		let data = req.body;
		utilsEmpresasService.validateData(data, function(status, message){

			if(!status)
				return res.status(401).json({status:'fail', message:message});

			Empresas.create({
				razao_social : data.razao_social,
				cnpj_base    : data.cnpj_base,
				status       : data.status,
			
			}).then((data) => {
				return res.status(201).json({status:'success', body:{data}});
			}).catch((err) => {
				return res.status(401).json({status:'fail', message:err});
			})

		});
	},

	delete: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		let _id = req.param('_id');

		/*Exclusão lógica*/
		Empresas.update(_id, {'status': false})

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

		if(filter == 'cnpj_base')
			where = {'cnpj_base' : value};

		if(filter == 'razao_social')
			where = {'razao_social' : '%'+value+'%'};

		
		Empresas.find({
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

		Empresas.findById(req.param('_id'), function(err, response){

			if(err)
				return res.status(401).json({status:'fail', message:err});

			res.status(200).json({status:'success', body:{response}});
		});
			
	}
};

