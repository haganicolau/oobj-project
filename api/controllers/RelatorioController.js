/**
 * RelatorioController
 *
 * 
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 * @description :: Funções responsáveis por executar a intermediação com o banco de 
 * dados na exportação e importação dos dados
 */


/*Dependências*/
var ObjectId = require('bson-objectid');
var empty = require('is-empty');

module.exports = {

	/*Exporta os dados*/
	export: (req, res) => {

		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});
		
		/*variável que irá retornar com os dados do relatório*/
		empresas = [];

		/*obtém todas as empresas*/
		Empresas.find()
			.then((empresasBD) => {

				empresasBD.forEach(function(item, index, array){

					/*Obtém todas as filiais*/
					Filiais.find({empresa : item.id})
						.then((filiais) => {
							
							/*gera população das filiais de cada respectiva empresa*/
							item.filiais = filiais;
							empresas.push(item);

							/*Se o novo vetor tiver o mesmo tamanho do vetor array, 
							 * quer dizer que as requisições acabaram.
							 */
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
	},

	/*Importa os dados para dentro do banco*/
	import: (req, res) => {

		/*verifica se token válido*/
		if(!authService.authenticateUserToken(req, res)) 
			return res.status(203).json({status:'fail', message:'not allowed'});
		
		/*dados para serem importados para empresa*/
		let data = req.body;
		data = data.empresas.empresa;
		
		auxFiliais = [];
		contadorFiliais = 0;


		data.forEach(function(item, index, array){

			/*valida se os dados estão corretos para importar para o banco*/
			utilsEmpresasService.validateData(item, function(status, message){

				if(!status)
					return res.status(401).json({status:'fail', message:"Documento inválido"});

				Empresas.create({
					razao_social 	  : item.razao_social,
					cnpj_base    	  : item.cnpj_base,
					status       	  : item.status,
					cadastro_completo : true
				
				}).then((resp) => {

					auxFiliais.push(resp.filiais);
							
					if(item.filiais.length > 0){

						item.filiais.forEach(function(it, idx, arr){

							utilsFiliaisService.validateData(it, function(status, message){
								if(!status)
									return res.status(401).json({status:'fail', message:message});

								Filiais.create({
									categoria : it.categoria,
									municipio : it.municipio,
									empresa   : resp.id,
									status    : it.status,
									cnpj      : it.cnpj,
									uf        : it.uf,
									
								}).then((data) => {
									
									contadorFiliais++;
									if(contadorFiliais === auxFiliais.length){
										return res.status(200).json({status:'success'});
									}

								}).catch((err) => {
									return res.status(401).json({status:'fail', message:err});
								})

							});

						})
					}

				}).catch((err) => {
					return res.status(401).json({status:'fail', message:err});
				})

			});

		});

	}
}