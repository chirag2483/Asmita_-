import mongoose from "mongoose";
const { Schema, model } = mongoose;

const teamAsmita = new Schema(
    {
        img_url: {
            type: String
        },
        name: {
            type: String
        },
        wing: {
            type: String
        }
    }
);

const TeamAsmita = model("TeamAsmita", teamAsmita);

export default TeamAsmita;
