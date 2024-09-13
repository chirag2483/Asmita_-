import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    Name: {
        type: Schema.Types.String,
        default: "User",
    },
    EnrollmentNo:{
        type: Schema.Types.String,
        default: "IIT2021001"
    },
    Role: {
        type: String,
        
        default: 'volunteer' 
    },
    Password:{
        type:String
    }
});

const User = model("User", userSchema);

export default User;
