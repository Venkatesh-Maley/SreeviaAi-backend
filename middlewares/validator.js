// src/middlewares/validator.js
const Joi = require('joi');

exports.connectSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'string.base': 'Name should be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name should be at least 3 characters long',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a string',
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
    }),
    phoneNumber: Joi.string().min(10).max(15).required().messages({
        'string.base': 'Phone number should be a string',
        'string.empty': 'Phone number is required',
        'string.min': 'Phone number should be at least 10 digits long',
        'string.max': 'Phone number should not exceed 15 digits',
    }),
    message: Joi.string().min(10).required().messages({
        'string.base': 'Message should be a string',
        'string.empty': 'Message is required',
        'string.min': 'Message should be at least 10 characters long',
    }),
});
