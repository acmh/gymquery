var mongoose = require('mongoose'),
		crypto = require('crypto'),
		jwt = require('jsonwebtoken'),
		Schema = mongoose.Schema,
		mongoosePaginate = require('mongoose-paginate');

var UserSchema = new Schema({
	email: {
		type: String,
		unique: true
	},
	name: {
		type: String,
		trim: true,
		unique: true
	},
	password: { type:String, select: false},
	salt: {type: String, select: false},
	role: {type: Number, default: 1},
	acc: {type: Number, default: 0},
	tried: {type: Number, default: 0},
	contributions: {type: Number, default: 0}
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64,'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.password === hash;
};

//Generate a token with some extra informations (like expire time)
UserSchema.methods.generateJwt = function() {
	var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
		role: this.role
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

/* Execute before each user.save() call
UserSchema.pre('save',
	function(next) {
		if (this.password) {
			var md5 = crypto.createHash('md5');
			this.password = md5.update(this.password).digest('hex');
		}

		next();
	);*/
UserSchema.plugin(mongoosePaginate);
mongoose.model('User', UserSchema);
