const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('Joi');
const config = require('config');

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    password: {
        type:String,
        required: true
    },
    login_id: {
        type: Array,
    },
    last_login: {
        type: Number,
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ id: this._id} , config.get('jwtPrivateKey'), {expiresIn: '1d'});
    return token;
}

const User = mongoose.model('User',userSchema);

function validateUser(user) {
    const schema = {
        username: Joi.string().max(50).required(),
        password:Joi.string().max(255).min(5).required()
    }
    return Joi.validate(user,schema);
}

module.exports.validateUser = validateUser;
module.exports.User = User;