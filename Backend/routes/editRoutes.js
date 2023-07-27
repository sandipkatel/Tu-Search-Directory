const express = require('express');

const router = express.Router();

const editHandler = require('../handlers/editHandler');

router.post('/add/', editHandler.addNode);
router.post('/edit/', editHandler.editNode);
router.post('/editPersonnel/', editHandler.editPersonnel);
router.post('/delete/', editHandler.deleteNode);
router.post('/addPersonnel/', editHandler.addPersonnel);
router.post('/deletePersonnel/', editHandler.deletePersonnel);
module.exports = router;
