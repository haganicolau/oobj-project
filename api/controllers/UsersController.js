/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var md5 = require('md5');
var ObjectId = require('bson-objectid');

module.exports = {
	index: (req, res) => {

		Users.find()
			
			.then((response) => {
				return res.status(200).json({status:'success', body:{response}});
			})
			.catch((err) => {
				return res.status(500).json({status:'fail', message:err});
			});
	},

	login:(req, res) => {

		validate = utilsUserService
			.validateDataLogin(req.body.email, req.body.password);
		
		if(!validate.status) 
			return res.status(401).json({status:'fail', 'message':validate.message});
		
		var password = md5(req.body.password);

		Users.findOne({
			'email': req.body.email,
			'password': password
		}).then((response) => {
	
			if(!response)
				return res.status(401).json({status:'fail', message:"User not found"});

			authService.generateUserToken(response, function (err, token) {
                if(err) 
                	return res.send(500).json({status:'fail', message:err});
                
                return res.status(200).json({status:'success', body:{token, user:response.id}});
            });

		})
		.catch((err)=> {
			return res.status(500).json({status:'fail', message:err});
		});
	},

	create: (req, res) => {

		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});


		user = req.body;
		
		utilsUserService.validateData(user, function(status, message){

			if(!status)
				return res.status(401).json({status:'fail', message:message});

			Users.create({
				name     : user.name,
				password : md5(user.password),
				salt     : md5(user.email),
				email    : user.email
			
			}).then((data) => {
				return res.status(201).json({status:'success', body:{data}});
			}).catch((err) => {
				return res.status(401).json({status:'fail', message:err});
			})

		});
	},

	sendEmail: (req, res) => {
		return res.status(501).json({status:'fail', message:'Não finalizado'});
		//sendEmailService.sendEmail();
	},

	editPass: (req, res) => {
		/*verify if valid token*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		let _id = req.param('id');
		let data = req.body;

		utilsUserService.validateDataPass(data, function(status, message){

			if(!status)
				return res.status(401).json({status:'fail', message:message});

			Users.update(_id, {
				password : md5(req.body.password),
			})

			.then((data)=>{
				return res.status(202).json({status:'success', body:null});
			})
			.catch((err)=>{
				return res.status(401).json({status:'fail', message:err});
			});

		});
	}, 

	update: (req, res) => {

	},

	search:(req, res) => {

	}
};

