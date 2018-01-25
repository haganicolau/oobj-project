/**
 * authService
 *
 * @author: Hagamenon Nicolau <haganicolau@gmail.com>
 * @description :: Funções responsáveis garantir a integridade e autencidade do acesso 
 * a solução
 */

/*Dependências*/
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');
var shortid = require('shortid');

/*Chave secreta*/
var jwtSecret = 'xStmbyc066BOFn40gIr29y09Ud94z1P7';

/*Função que gera um hash para criptografia*/
function hash(value, salt, done) {
    salt = salt || bcrypt.genSaltSync();

    bcrypt.hash(value, salt, null, function (err, hash) {
        if (err) return done(err);

        done(null, hash, salt);
    });
}

module.exports = {

    /*Usuário ao logar, vai usar esta função para gerar um novo token*/
    generateUserToken: function (user, done) {
        var issueDate = moment().utc().format(),
        encodedToken = null;

        try {
            encodedToken = jwt.encode({ id: user.email, issued: issueDate }, jwtSecret);
        } catch (err) {
            return done(err);
        }

        return done(null, {
            issued: issueDate,
            token: encodedToken
        });
    },

    /*Toda vez que o usuário fazer uma requisição a API, o token deverá ser validado*/
    authenticateUserToken: function (req, res) {

      var issueDate = req.headers["x-token-issued"];
      var token = req.headers["x-token"];

      if(!issueDate || !token){
        return false;
      }
      
      var issued = moment.utc(issueDate),
          tokenObj = null;

      /* verifique a data do problema para ver se o token expirou (maneira 
      *  rápida de expulsar os toques expirados) para verificar com precisão 
      *  os minutos que precisamos verificar em segundos, pois o momento arredonda 
      *  o resultado para a unidade mais próxima
      */
      if (moment.utc().diff(issued, 'seconds') > 36000) {
          return false;
      }

      try {
          tokenObj = jwt.decode(token, jwtSecret);
      } catch (err) {
          return false;
      }

      /*valide que o issueDate passou nas correspondências da data de emissão em que o 
      * token foi criado com
      */
      if (tokenObj.issued !== issueDate) {
          return false;
      }

      return true;
      
    }
};