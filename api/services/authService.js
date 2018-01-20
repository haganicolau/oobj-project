/**
 * authService
 *
 * @description :: 
 */
 
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');
var shortid = require('shortid');

// this would need to live in sails config
var jwtSecret = 'xStmbyc066BOFn40gIr29y09Ud94z1P7';

function hash(value, salt, done) {
    salt = salt || bcrypt.genSaltSync();

    bcrypt.hash(value, salt, null, function (err, hash) {
        if (err) return done(err);

        done(null, hash, salt);
    });
}

module.exports = {

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

    authenticateUserToken: function (req, res) {

      var issueDate = req.headers["x-token-issued"];
      var token = req.headers["x-token"];

      if(!issueDate || !token){
        return false;
      }
      
      var issued = moment.utc(issueDate),
          tokenObj = null;

      /* check the issue date to see if the token has expired (quick way to kick out expired tokens)
      * to check accurately for minutes we need to check in seconds as moment rounds the result down 
      * to the nearest unit
      */
      if (moment.utc().diff(issued, 'seconds') > 36000) {
          return false;
      }

      try {
          tokenObj = jwt.decode(token, jwtSecret);
      } catch (err) {
          return false;
      }

      /*validate that the issueDate passed in matches the issue date the token was created with*/
      if (tokenObj.issued !== issueDate) {
          return false;
      }

      return true;
      
    }
};