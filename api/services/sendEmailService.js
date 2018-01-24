/**
 * authService
 *
 * @description :: 
 */

const nodemailer = require('nodemailer');
module.exports = {

	sendEmail: function(origin, destiny, subject, text, html){

		'use strict';
		
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		nodemailer.createTestAccount((err, account) => {

		    // create reusable transporter object using the default SMTP transport
		    let transporter = nodemailer.createTransport({
		        host: 'smtp.mailtrap.io',
		        port: 2525,
		        secure: false, // true for 465, false for other ports
		        auth: {
		            user: 'b98940f5dc786e', // generated ethereal user
		            pass: 'bf491f9aad477e'  // generated ethereal password
		        }
		    });

		    // setup email data with unicode symbols
		    let mailOptions = {
		        from: origin, // sender address
		        to: destiny, // list of receivers
		        subject: subject, // Subject line
		        text: text, // plain text body
		        html: html // html body
		    };

		    // send mail with defined transport object
		    transporter.sendMail(mailOptions, (error, info) => {
		        if (error) {
		            return console.log(error);
		        }
		        console.log('Message sent: %s', info.messageId);
		        // Preview only available when sending through an Ethereal account
		        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

		        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
		        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
		    });
		});
	}

}