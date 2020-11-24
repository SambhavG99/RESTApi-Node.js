const mongoose = require('mongoose');
const Joi = require('joi');

const districtSchema = new mongoose.Schema({
    state: new mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    }),
    district_name: {
        type: String,
        required: true
    } 
});

const District = mongoose.model('District', districtSchema);

function validateDistrict(district){
    const schema = { 
        state_id: Joi.objectId().required(),
        district_name: Joi.string().max(255).required()
    }
    return Joi.validate(district,schema);
}

module.exports.validateDistrict = validateDistrict;
module.exports.District = District;