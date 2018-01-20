/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  /*
  *User routes
  */
  '/': {
    view: 'homepage'
  },

  'POST /login' : {
    controller: "UsersController", 
    action: "login"
  },

  'GET /users' : {
    controller: "UsersController", 
    action: "index"
  },

  'POST /users' : {
    controller: "UsersController", 
    action: "create"
  },

  /*
  *Empresa routes
  */

  'GET /empresas' : {
    controller: "EmpresasController", 
    action: "index"
  },

  'POST /empresas' : {
    controller: "EmpresasController", 
    action: "create"
  },

  'DELETE /empresas' : {
    controller: "EmpresasController", 
    action: "delete"
  },

  'PUT /empresas' : {
    controller: "EmpresasController", 
    action: "update"
  },

  'GET /empresas/filter' : {
    controller: "EmpresasController", 
    action: "search"
  },

  'GET /empresas/findOne' :{
    controller: "EmpresasController", 
    action: "findOne"
  },

  /*
  *filiais routes
  */

  'GET /filiais' : {
    controller: "FiliaisController", 
    action: "index"
  },

  'POST /filiais' : {
    controller: "FiliaisController", 
    action: "create"
  },

  'PUT /filiais' : {
    controller: "FiliaisController", 
    action: "update"
  },

  'DELETE /filiais' : {
    controller: "FiliaisController", 
    action: "delete"
  },

  'GET /filiais/findOne' :{
    controller: "FiliaisController", 
    action: "findOne"
  }

};
