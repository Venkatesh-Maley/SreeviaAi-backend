const jwt = require('jsonwebtoken');
const { signupSchema,signinSchema } = require("../middlewares/validator");
const usersModel = require("../models/users.model");
const User = require("../models/users.model");
const { doHash, doHashValidation } = require("../utils/hashing");


exports.signup = async (req, res) => {
    const {email, password} = req.body;
    try{
        const {error, value} = signupSchema.validate({email,password});
        if(error){
            return res.status(401).json({success:false, message: error.details[0].message})
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({success: false, message: "User Already Exists"})
        }

        const hashedPassword = await doHash(password, 12);
        const newUser = new User({
            email,
            password: hashedPassword
        })
        const result = await newUser.save();
        result.password = undefined;
        res.status(201).json({
            success: true, message:"your account has been created successfully", result
        })
    } catch(error){
        console.log(`Error while signup: ${error.message}` )
    }
}

exports.signin = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const {error, value} = signinSchema.validate({email, password});
        if(error){
            return res.status(401).json({success: false, message: error.details[0].message});
        }
        const existingUser = await User.findOne({email}).select('+password')
        if(!existingUser){
            return res.status(401).json({success: false, message: "User does not Exists"})
        }
        const result = doHashValidation(password, existingUser.password)
        if(!result){
            return res.status(401).json({success: false, message: "Invalid Credentials"})
        }

        const token = jwt.sign(
            {
                userId: existingUser._id,
                email: existingUser.email,
            },
            process.env.TOKEN_SECRET,
            {
                expiresIn: '6h'
            }
        );
        res.cookie('Authorization', 'Bearer' + token, { 
            expires: new Date(Date.now() + 8* 3600000), 
            httpOnly: process.env.NODE_ENV === 'production', 
            secure: process.env.NODE_ENV === 'production'
        }).json({success: true, token, message: 'Logged in successfully'})
    } catch(error){
        console.log(error);
    }
}

exports.signout = async (req, res)=> {
    res.clearCookie('Authorization').status(200).json({success: true, message: "Logged out Successfully"})
}