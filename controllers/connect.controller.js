const Connect = require('../models/connect.model');

const createConnect = async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;
    if (!name || !email || !phoneNumber || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newConnect = new Connect({
      name,
      email,
      phoneNumber,
      message,
    });
    await newConnect.save();
    return res.status(201).json({ message: 'Connection created successfully', data: newConnect });
  } catch (error) {
    console.error(`Error while submitting contact form: ${error.message}`); 
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

const getAllConnects = async (req, res) => {
  try {
    const connects = await Connect.find(); 
    return res.status(200).json({ success: true, data: connects });
  } catch (error) {
    console.error(`Error while fetching connections: ${error.message}`);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Export the controller functions
module.exports = {
  createConnect, getAllConnects
};
