const express = require('express');
const connectController = require('../controllers/connect.controller');
const router = express.Router();

router.post('/create-connect', connectController.submitContactForm); // Route for contact form submission

module.exports = router;
