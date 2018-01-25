/**
 * Filiais.js
 *
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 * @description :: TODO: Modelo que efetua o mapeamento ORM usando waterline
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

