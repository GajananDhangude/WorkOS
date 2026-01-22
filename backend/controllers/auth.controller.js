const UserModel = require("../models/UserSchema.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



async function registerUser(req , res) {
    const {name , email , password , role} = req.body;

    const isUserExists = await UserModel.findOne({email:email})

    if(isUserExists){
        return res.status(400).json({message:"User already exists"});
    }

    const HashedPassword = await bcrypt.hash(password , 10);

    const newUser = await UserModel.create({
        name:name,
        email:email,
        password:HashedPassword,
        role:role
    })

    const token = jwt.sign({
        id:newUser._id,
    }, process.env.JWT_SECRET);

    res.cookie("token" , token);

    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role
        }
    })
}


async function LoginUser(req , res){
    const {email , password} = req.body;

    const user = await UserModel.findOne({email:email});

    if(!user){
        return res.status(400).json({message:"Invalid email or password"});
    }

    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid email or password"});
    }

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET);

    res.cookie("token" , token);

    res.status(201).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    })
}


function LogoutUser(req , res) {
    res.clearCookie("token");
    res.status(200).json({message:"User logged out successfully"});
}

module.exports = {
    registerUser,
    LoginUser,
    LogoutUser
}
