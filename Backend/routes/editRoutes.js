const express = require('express');

const router = express.Router();

const editHandler = require('../handlers/editHandler');

router.post('/add/', editHandler.addNode);
router.post('/edit/', editHandler.editNode);
router.post('/delete/', editHandler.deleteNode);

module.exports = router;
