const mongoose = require('mongoose');
const Joi = require('joi');

const childSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        maxlength: 255
    },
    sex:{
        type:String,
        required:true,
        maxlength:1
    },
    dob:{
        type:Date,
        required:true
    },
    father_name:{
        type:String,
        required: true
    },
    mother_name: {
        type:String,
        required: true
    },
    district_id: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    }
});

const Child = mongoose.model('Child',childSchema);

function validateChild(child){
    const schema = {
        name: Joi.string().required().max(255),
        sex: Joi.string().required().max(1),
        dob: Joi.date().required(),
        father_name: Joi.string().required().max(255),
        mother_name: Joi.string().required().max(255),
        district_id: Joi.objectId().required(),
        photo: Joi.string().uri()
    }
    return Joi.validate(child, schema);
}

module.exports.validateChild = validateChild;
module.exports.Child = Child;