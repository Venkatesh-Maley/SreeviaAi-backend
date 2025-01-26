const express = require('express');
const { createConnect } = require('../controllers/connect.controller');

const router = express.Router();

router.post('/create-connect', createConnect);

module.exports = router;
