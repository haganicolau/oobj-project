/**
 * Filiais.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    cnpj: {
    	type: 'string',
    	required:true
    },

    status: {
    	type: 'string',
    	required: true
    },

    municipio: {
    	type: 'string',
    	required: true
    },

    uf: {
    	type: 'string',
    	required: true
    },

    empresa: {
    	model: 'empresas'
    },

    categoria: {
    	type: 'string',
    	required: true
    }

  }
};

