
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum : ["Admin", "User", "Instructor"],
        required:true,
    },
    additionalDetails: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    image:{
        type:String,
        required:true
    },
    token :{
        type:String,
    },
    resetPasswordExpires: {
        type:Date,
    },

},
{ timestamps: true }
)

export const User = mongoose.model("User",userSchema);
