
//app/models/user.js
//load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//define the schema for our user model
var userSchema = mongoose.Schema({	
	_id					:{ type: Number, default: 1 },
	username			: String,
	email				: String,
	password 			: String,
	profileImage 		: { type: String, default: '' },
	token			: { type: String, default: '' },
	crd					: { type: Date, default: new Date() }
});


//methods ======================
//generating a hash
userSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};

userSchema.methods.authtoken = function() {
 return bcrypt.hashSync(Math.floor((Math.random() * 99999999) *54), null, null);
};

//create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);