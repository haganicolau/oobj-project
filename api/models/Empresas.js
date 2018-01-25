/**
 * Empresas.js
 *
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 * @description :: TODO: Modelo que efetua o mapeamento ORM usando waterline
 */

module.exports = {

  attributes: {

    razao_social: {
        type: 'string',
        required: true
    },

    cnpj_base:{
    	type: 'string',
    	required:true
    },

    status:{
    	type: 'string',
    	required: true
    },

    cadastro_completo:{
        type: 'boolean',
        required: true
    }
  }
};

