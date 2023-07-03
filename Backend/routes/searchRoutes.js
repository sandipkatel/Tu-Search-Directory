const express = require('express');

const search = require('../handlers/searchHandler');

const router = express.Router();



router.get('/search/general/',search.generalHandler);
router.get('/search/organization_name/',search.nameHandler);
router.get('/search/personnel/',search.personnelHandler);
router.get('/search/program/',search.programHandler);


module.exports = router;

