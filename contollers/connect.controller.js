const { connectSchema } = require('../middlewares/validator');
const Connect = require('../models/connect.model');

exports.submitContactForm = async (req, res) => {
    const { name, email, phoneNumber, message } = req.body;

    try {
        // Validate request body
        const { error, value } = connectSchema.validate({ name, email, phoneNumber, message });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        // Create a new contact form entry
        const newMessage = new Connect({ name, email, phoneNumber, message });
        const result = await newMessage.save();

        res.status(201).json({
            success: true,
            message: "Your message has been received successfully. We will get back to you soon.",
            data: result,
        });
    } catch (error) {
        console.log(`Error while submitting contact form: ${error.message}`);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};
