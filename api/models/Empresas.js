/**
 * Empresas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
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

