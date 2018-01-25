/**
 * Users.js
 *
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 * @description :: TODO: Modelo que efetua o mapeamento ORM usando waterline
 */

module.exports = {

  attributes: {

  	name: {
        type: 'string',
        required: true
    },
   
    email: {
        type: 'string',
        required: true
    },

    password: {
        type: 'string',
        required: true
    },

    salt: {
      type: 'string'
    }
  }
};

