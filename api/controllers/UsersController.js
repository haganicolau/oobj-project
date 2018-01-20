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
				res.json(response);
			})
			.catch((err) => {
				res.status(500).json(err);
			});
	},

	login:(req, res) => {

		validate = utilsUserService
			.validateDataLogin(req.body.email, req.body.password);
		if(!validate.status) res.status(401).json(validate.message);
		
		var password = md5(req.body.password);

		Users.findOne({
			'email': req.body.email,
			'password': password
		}).then((response) => {
	
			if(response){
				authService.generateUserToken(response, function (err, token) {
	                if (err) return res.send(500).json(err);
	                
	                res.json(200, {token: token});
	            });

			} else{
				res.status(401).json("User not found");
			}

		})
		.catch((err)=> {
			res.status(500).json(err);
		});
	},

	create: (req, res) => {
		user = req.body;
		
		utilsUserService.validateData(user, function(status, message){

			if(!status){
				res.status(401).json(message);
			}

			Users.create({
				name     : user.name,
				password : md5(user.password),
				salt     : md5(user.email),
				email    : user.email
			
			}).then((data) => {
				res.status(201).json(data);
			}).catch((err) => {
				res.status(401).json(err);
			})

		});
	},

	destroy: (req, res) => {

	},

	edit: (req, res) => {

	}, 

	update: (req, res) => {

	},

	search:(req, res) => {

	}
};

