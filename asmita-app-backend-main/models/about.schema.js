import mongoose from "mongoose";
const { Schema, model } = mongoose;

const about = new Schema(
    {
        image: {
            type: String
        },
        description: {
            type: String
        }
    }
);

const About = model("About", about);

export default About;
