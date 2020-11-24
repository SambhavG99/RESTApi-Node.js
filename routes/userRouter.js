const express = require('express');
const router = express.Router();
const {User, validateUser}  = require('../models/users');
router.post('/', async (req,res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ username: req.body.username, password: req.body.password });
    if(!user) return res.status(401).send('Authentication Failed');

    const token = user.generateAuthToken();
    const timestamp = Date.now();
    const login_id = `${user.username}${Math.floor(Math.random() * 1000)}`
    const userLoginDetails = {
        "success": true,
        "status": 200,
        "message": "Login successfull.",
        "token": token,
        "last_login": user.last_login || "-",
        "login_id": login_id,
        "timestamp": timestamp
    }
    user.last_login = timestamp;
    user.login_id.push(login_id);
    await user.save();
    res.status(200).send(userLoginDetails);
});


module.exports = router;