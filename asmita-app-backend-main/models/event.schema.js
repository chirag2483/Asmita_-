import mongoose from "mongoose";
const { Schema, model } = mongoose;

const event = new Schema(
    {
        name: {
            type: String
        },
        wing: {
            type: String
        },
        image: {
            type: String
        }
    }
);

const Event = model("Event", event);

export default Event;
