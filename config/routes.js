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
  
  /*Verificar documentão das rotas do WEB Service entregues junto com o projeto.*/
  /*
  *User routes
  */
  '/api/v1': {
    view: 'homepage'
  },

  'POST /api/v1/login' : {
    controller: "UsersController", 
    action: "login"
  },

  'GET /api/v1/users' : {
    controller: "UsersController", 
    action: "index"
  },

  'POST /api/v1/users' : {
    controller: "UsersController", 
    action: "create"
  },

  'PUT /api/v1/editPass' : {
    controller: "UsersController", 
    action: "editPass"
  },

  /*
  *Empresa routes
  */

  'GET /api/v1/empresas' : {
    controller: "EmpresasController", 
    action: "index"
  },

  'POST /api/v1/empresas' : {
    controller: "EmpresasController", 
    action: "create"
  },

  'DELETE /api/v1/empresas' : {
    controller: "EmpresasController", 
    action: "delete"
  },

  'PUT /api/v1/empresas' : {
    controller: "EmpresasController", 
    action: "update"
  },

  'GET /api/v1/empresas/findOne' :{
    controller: "EmpresasController", 
    action: "findOne"
  },

  /*
  *filiais routes
  */

  'GET /api/v1/filiais' : {
    controller: "FiliaisController", 
    action: "index"
  },

  'POST /api/v1/filiais' : {
    controller: "FiliaisController", 
    action: "create"
  },

  'PUT /api/v1/filiais' : {
    controller: "FiliaisController", 
    action: "update"
  },

  'DELETE /api/v1/filiais' : {
    controller: "FiliaisController", 
    action: "delete"
  },

  'GET /api/v1/filiais/findOne' :{
    controller: "FiliaisController", 
    action: "findOne"
  },

  /*
  *Relatórios routes
  */

  'GET /api/v1/relatorio/export' :{
    controller: "RelatorioController", 
    action: "export"
  },

  'POST /api/v1/relatorio/import' :{
    controller: "RelatorioController", 
    action: "import"
  }

};
