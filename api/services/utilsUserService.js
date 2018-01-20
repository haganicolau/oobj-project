/**
 * utilsUserService
 *
 * @description :: 
 */

function findUserByEmail(email, done){
	Users.findOne({
	'email': email
	}).then((response) => {

		if(response){
			return done(false, "Email already registered");
		} else{
			return done(true, null);
		}

	})
	.catch((err)=> {
		done(false, err);
	});
}

function validateEmail(email){

	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);

}

module.exports = {
 	validateData:function(body, done){

 		if(!body.email){
 			return done(false, 'Email is required!');
 		}

 		if(!body.password || !body.confirm_password){
 			return done(false, 'Password and confirm password are required!');
 		}

 		if(!body.name){
 			return done(false, 'Name is required');
 		}

 		if(body.password !== body.confirm_password){
 			return done(false, 'Password and confirm password must be equals');
 		}

 		if(!validateEmail(body.email)){
 			return done(false, 'Invalid email');
 		}

 		findUserByEmail(body.email, function(status, message){
 
 			if(!status){
 				return done(false, message);
 			}

	 		else{
	 			return done(true, null);
	 		}
 		});
 	},

 	validateDataLogin: function(email, password){
 		var messsage = '';

 		if(!email || !password){
			return {status:false, message:"Not authorized"};
		}

		return {status: true};
 	}
}