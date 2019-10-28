const router = require('express').Router();
const User = require('../models/User.js');
const { registerValidation, loginValidation } = require('./validation.js');

//get list of users
router.get('/users', (req, res) => {
    res.send({type: 'GET'});
});

//add new user
router.post('/register', async(req, res) => {

    const {error} = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    // res.send({type: 'POST'});

    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).send('Email already exists');

    User.create(req.body).then(function(user) {
        res.send(user);
    });
});

router.post('/login', (req, res) => {
    const {error} = loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const email = await User.findOne({ email: req.body.email });
    const user = await User.findOne({ username: req.body.username })
    if(!user) 
        return res.status(400).send('Email/PW Incorrect');

    res.send('Logged In');
    
});

//remove user from db
router.delete('/users/:id', (req, res) => {
    res.send({type: 'DEL'});
});

//update a user in db
router.put('/users:id', (req, res) => {
    res.send({type: 'PUT'});
});

module.exports = router;