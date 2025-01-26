const Connect = require('../models/connect.model');

// Create a new connection
const createConnect = async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;

    // Validate input
    if (!name || !email || !phoneNumber || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new document in the Connect collection
    const newConnect = new Connect({
      name,
      email,
      phoneNumber,
      message,
    });

    await newConnect.save();
    return res.status(201).json({ message: 'Connection created successfully', data: newConnect });
  } catch (error) {
    console.error(`Error while submitting contact form: ${error.message}`);  // Log the error
    res.status(500).json({ success: false, message: "Server error. Please try again later." });

  }
};

// Export the controller functions
module.exports = {
  createConnect,
};
