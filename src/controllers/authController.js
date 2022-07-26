const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config')
const verifyToken = require('./verifyToken');

const User = require('../models/User');

router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = new User({
        username,
        email,
        password
    });
    user.password = await user.encryptedPassword(user.password);
    await user.save();
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });

    res.json({auth: true, token})
});

router.get('/me', verifyToken, async (req, res, next) => {

    const user = await User.findById(req.userId, {password: 0});
    if (!user) {
        return res.status(404).send('No user found');
    }

    res.json(user);
});


router.post('/singin', async (req, res, next) => {
    const { email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user) {
        return res.status(404).send("The email does not exist")
    }
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
        return res.status(401).send({ auth: false, token: null });
      }
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 60 * 60 * 24,
      });
      res.status(200).json({ auth: true, token });
    
    const passwordIsValid = await user.validatePassword(password);
    console.log(passwordIsValid)
    res.json('singin');
});




module.exports = router;