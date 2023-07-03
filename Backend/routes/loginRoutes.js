
const express = require('express');

const auth = require('../handlers/authHandler')


const router = express.Router();

router.post('/login', auth.loginHandler);

router.post('/signup', auth.signupHandler);

module.exports = router;