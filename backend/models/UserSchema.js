const mongoose = require("mongoose");
const Schema  = mongoose.Schema;


const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    role:{
        type: String,
        enum: ['job_seeker', 'recruiter', 'admin' , "student"],
        required: true,
        default: 'job_seeker',
    },

    createdAt:{
        type:Date,
        default:Date.now,
    },
    
    profile:{
        firstname: String,
        lastname:String,
        phone:String,
        location:{
            city:String,
            state:String,
            country:String,
        },
        avatar:String,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isActive:{
        type:String,
        default:true,
    },
    lastlogin:Date,
    updatedAt:{
        type:String,
        default:Date.now,
    }
})

const userModel = mongoose.model("User" , userSchema);

module.exports = userModel;


