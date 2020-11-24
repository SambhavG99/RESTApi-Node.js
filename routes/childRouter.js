const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');
const {Child, validateChild} = require('../models/child');

router.get('/', auth, async (req,res) => {
    const children = await Child.find().sort({name:1}).select('-_id -__v');
    res.status(200).json(children);
});

router.post('/',auth, async (req,res) => {
    const {error} = validateChild(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // if(req.sex != 'M' && req.sex != 'F') return res.status(400).send('Sex can be M or F only.');

    const child = await new Child({
        name: req.body.name,
        sex: req.body.sex,
        dob: req.body.dob,
        father_name: req.body.father_name,
        mother_name: req.body.mother_name,
        district_id: req.body.district_id,
        photo: req.body.photo
    });

    await child.save();
    res.send(child);
});


module.exports = router;