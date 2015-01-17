var crypto = require('crypto');

var AccountConfig = function (config, mongoose, nodemailer) {
	var AccountSchema = new mongoose.Schema({

		email : {
			type : String, 
			unique : true
		},

		password : {
			type : String
		},

		name : {
			first : {
				type : String
			},
			last : {
				type : String
			}
		},

		birthday : {
			day : {
				type : Number,
				min : 1,
				max : 12,
				required : false
			},
			year : {
				type : Number
			}
		},

		photoURL : {
			type : String
		},

		biography : {
			type : String
		}
	});

	var Account = mongoose.model('Account', AccountSchema);

	var registerCallback = function (err){
		if (err){
			return console.lgo(err);
		};
		return console.log('La cuenta fue creada');
	};

	var changePassword = function (accountId, newpassword){
		
		var shaSum = crypto.createHash('sha256');
		shaSum.update(newpassword);

		var hashedPassword = shaSum.digest('hex');
		Account.update(
			{ _id : accountId },
			{ $set : { password : hashedPassword } },
			{ upsert : false }, function changePasswordCallback (err){
				console.log('Cambio de password realizado ' + accountId);
			}
		);
	};

	var forgotPassword = function (email, resetPasswordURL, callback){
		var user = 	Account.findOne({ 
						email : email 
					}, 
					function (err, doc){
						if (err){
							console.log('El mail no es valido');
							callback(false);
						}else{
							var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
							resetPasswordUrl += '?account=' + doc._id;
							smtpTransport.sendMail({
								from : 'geroplas_bofo@hotmail.com',
								to : doc.email,
								subject : 'Tu contraseña esta configurada',
								text : 'Click here to reset your password: ' + resetPasswordUrl
							}, function forgotPasswordResult (err){
								if (err)
									callback(false);
								else
									callback(true);
							});
						}
					});
	};

	var login = function (email, password, callback){
		var shaSum = crypto.createHash('sha256');
		shaSum.update(password);

		Account.finOne({ email : email, password : shaSum.digest('hex') }, function (err, doc){
			callback(null != doc);
		});
	};

	var register = function (email, password, firstName, lastName){
		var shaSum = crypto.createHash('sha256');
		shaSum.update(password);

		console.log('Registrando ' + email);

		var user = new Account({
			email : email,
			first : firstName,
			last : lastName,
			password : shaSum.digest('hex')
		});

		user.save('Salvado como se envio');
	};

	return{
		register : register,
		forgotPassword : forgotPassword,
		changePassword : changePassword,
		login : login,
		register : register
	}
};

module.exports = AccountConfig;