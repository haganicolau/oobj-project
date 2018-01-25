/**
 * UsersController
 *
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 * @description :: Gestão dos dados de Usuários
 */

 /*Dependências*/
var md5 = require('md5');
var ObjectId = require('bson-objectid');

module.exports = {

	/*Lista dos dados de usuários*/
	index: (req, res) => {

		Users.find()
			
			.then((response) => {
				return res.status(200).json({status:'success', body:{response}});
			})
			.catch((err) => {
				return res.status(500).json({status:'fail', message:err});
			});
	},

	/*Login*/
	login:(req, res) => {

		/*valida se login e senha são válidos*/
		validate = utilsUserService
			.validateDataLogin(req.body.email, req.body.password);
	
		if(!validate.status) 
			return res.status(401).json({status:'fail', 'message':validate.message});
		
		/*criptografa a senha*/
		var password = md5(req.body.password);

		/*faz a busca do usuário por email e password passado no corpo da requisição*/
		Users.findOne({
			'email': req.body.email,
			'password': password
		}).then((response) => {
		
			/*se response inválido, responde que login e senha são inválidos*/
			if(!response)
				return res.status(401).json({status:'fail', message:"User not found"});

			/*Se responsel válido, gerar tokende acesso para enviar na resposta. */
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

	/*cadastro de usuario*/
	create: (req, res) => {

		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		/*Obtém os dados passado no corpo da requisição*/
		user = req.body;
		
		/*valida dos dados*/
		utilsUserService.validateData(user, function(status, message){

			/*Se registro inválido, responde que não foi possível cadastrar o dado.*/
			if(!status)
				return res.status(401).json({status:'fail', message:message});

			/*armazena os dados*/
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

	/*Método pronto, porém nao foi concluído pq nao tinha nenhuma ferramenta de 
	 *disparo de email free.
	 */
	sendEmail: (req, res) => {
		return res.status(501).json({status:'fail', message:'Não finalizado'});
		//sendEmailService.sendEmail();
	},

	/*Edit senha*/
	editPass: (req, res) => {
		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		/*Obtém o dado que será passado por parâmetro*/
		let _id = req.param('id');

		/*Obtém os dados passado no corpo da requisição*/
		let data = req.body;

		/*valida os dados */
		utilsUserService.validateDataPass(data, function(status, message){

			/*Se validação retornar inválida response ao cliente da requisição que o 
			 * cadastro foi invalidado.
			 */
			if(!status)
				return res.status(401).json({status:'fail', message:message});

			/*Altera a senha*/
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

