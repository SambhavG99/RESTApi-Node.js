const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');
const {State} = require('../models/states');
const {District,validateDistrict} = require('../models/district');

router.get('/', auth, async (req,res) => {
    const districts = await District.find().select('-__v');
    res.status(200).json(districts);
});

router.post('/',auth, async (req,res) => {
    const {error} = validateDistrict(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const state = await State.findById(req.body.state_id);
    if(!state) return res.status(400).send("Invalid State ID");

    const district = await new District({
        state: {
            name: state.name
        },
        district_name: req.body.district_name
    });

    await district.save();
    return res.send(district);
})


module.exports = router;