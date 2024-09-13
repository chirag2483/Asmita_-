import mongoose from "mongoose";
const { Schema, model } = mongoose;

const logSchema = new Schema(
    {
        enrollment_no: {
            type: String
        },
        details: {
            type: String,
        },
    },
    { timestamps: true }
);

const LogDetails = model("LogDetails", logSchema);

export default LogDetails;
