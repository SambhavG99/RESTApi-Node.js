const mongoose = require('mongoose');
const Joi = require('joi');

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const State = mongoose.model('State' , stateSchema);

function validateState(state){
    const schema = {
        state_name: Joi.string().required().max(255)
    }
    return Joi.validate(state, schema);
}

module.exports.validateState = validateState;
module.exports.State = State;