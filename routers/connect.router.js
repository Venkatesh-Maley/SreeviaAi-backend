const express = require('express');
const { createConnect, getAllConnects } = require('../controllers/connect.controller');

const router = express.Router();

router.post('/create-connect', createConnect);
router.get('/getAll-connect',getAllConnects);

module.exports = router;
