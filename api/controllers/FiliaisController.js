/**
 * FiliaisController
 *
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 * @description :: Funções responsáveis por interagir com base de dados do modelo filiais
 */

module.exports = {
	
	/*Método executado pela rota GET que obem a lista de filiais*/
	index: (req, res) => {

		/*verifica se token válido*/
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

	/*Método executado pela rota POST para enviar os dados de filiais*/
	create: (req, res) => {

		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		/*Obtém o dado que será passado no corpo da requisição*/
		let data = req.body;

		/*valida se os dados a serem inseridos são válidos*/
		utilsFiliaisService.validateData(data, function(status, message){
			if(!status)
				return res.status(401).json({status:'fail', message:message});

			/*Pesquisa para ver se empresa existe, para ser vínculado a filial*/
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
					
				}).then((filial) => {

					/*Atualizando Empresa para cadastro concluído com sucesso*/
					Empresas.update(response[0].id, {
						cadastro_completo : true
					})
					.then((empresa)=>{
						return res.status(201).json({status:'success', body:{filial}});
					});

				}).catch((err) => {
					return res.status(401).json({status:'fail', message:err});
				})
			});
		});
	},

	/*Função chamada pela rota de deleção de filiais*/
	delete: (req, res) => {

		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		/*Obtém o dado que será passado por parâmetro*/
		let _id = req.param('id');


		/*Exclusão Empresas*/
		Filiais.destroy({
			id: _id
		
		}).exec(function(err) {
			if(err)
				return res.status(401).json({status:'fail', message:err});

			return res.status(202).json({status:'success', body:null});
		});

	},

	/*Função a ser chamada na rota de edição de filial. */
	update: (req, res) => {

		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});

		/*Obtém o dado que será passado por parâmetro*/
		let _id = req.param('id');

		/*Obtém os dados passado no corpo da requisição*/
		let data = req.body;

		/*Valida se dados a serem alterados são válidos*/
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
				return res.status(401).json({status:'fail', message:err});
			});

		});
	},

	/*Função que é executada no rota de busca de um registro específico*/
	findOne: (req, res) => {

		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res))
			return res.status(203).json({status:'fail', message:'not allowed'});

		/*obtém o dado que foi passado por parâmetro na url*/
		if(!req.param('id'))
			return res.status(401).json({status:'fail', message:'_id is required'});


		/*Pesquisa e envia o dado achado*/
		Filiais.findById(req.param('_id'), function(err, response){

			if(err)
				return res.status(401).json({status:'fail', message:err});

			return res.status(200).json({status:'success', body:{response}});
		});
			
	},

	countFiliais: (Empresas) => {
		
	}
};



