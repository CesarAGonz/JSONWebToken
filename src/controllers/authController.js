const { Router } = require('express');
const router = Router();

router.post('/signin', (req, res, next) => {
    res.json('signin');
});

router.post('/singup', (req, res, next) => {
    res.json('singup');
});

router.get('/me', (req, res, next) => {
    res.json('me');
});



module.exports = router;