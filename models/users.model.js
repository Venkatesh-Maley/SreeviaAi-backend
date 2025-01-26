const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: [true, "Email should be unique"],
        lowercase: true
    },
    password:{
        type: String,
        required: [true, "Password must be provided"],
        trim: true,
        select: false
    }
},{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);