const express = require('express');
const router = express.Router();

const retrieveHandler = require('../handlers/retrieveHandler');

router.get('/nodes', retrieveHandler);

module.exports = router;
