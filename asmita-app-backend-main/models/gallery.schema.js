import mongoose from "mongoose";
const { Schema, model } = mongoose;

const gallery = new Schema(
    {
        name: {
            type: String
        },
        image: {
            type: String
        },
        url: {
            type: String
        }
    }
);

const Gallery = model("Gallery", gallery);

export default Gallery;
