const express = require('express');

const router = express.Router();

const editHandler = require('../handlers/editHandler');

router.post('/add/', editHandler.addNode);
router.post('/edit/', editHandler.editNode);
router.post('/editPersonnel/', editHandler.editPersonnel);
router.post('/delete/', editHandler.deleteNodebyId);
// router.post('/deleteNode/', editHandler.deleteNode);
router.post('/addPersonnel/', editHandler.addPersonnel);
router.post('/deletePersonnel/', editHandler.deletePersonnel);
router.post('/addProgram/', editHandler.addProgram);
router.post('/deleteProgram/', editHandler.deleteProgram);
module.exports = router;
