import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"first name is required"],
        trim:true,/// remove whitespaces from beginning
        minlength:[2,"first name must have atleast 2 letters"],
        maxlength:[50,"the name cannot exceed 50 characters"]


    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        minlength: [2, "Last name must be at least 2 characters long"],
        maxlength: [50, "Last name cannot exceed 50 characters"]
    },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true, // Convert to lowercase before saving
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email address"
        ]
    },

     password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
        timestamps:true
    
    
    }
);
module.exports = mongoose.model("User", userSchema);
