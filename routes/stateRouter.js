const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth');
const {State,validateState} = require('../models/states');

router.get('/', auth, async(req,res) => {
    const states = await State.find();
    res.status(200).json(states);
});

router.post('/', auth, async (req,res) => {
    const {error} = validateState(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const state = await new State({
        name: req.body.state_name
    });
    await state.save();
    return res.send(state);
})


module.exports = router;