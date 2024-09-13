import mongoose from "mongoose";
const { Schema, model } = mongoose;
//this is the second type of model for fixtures
const athleteSchema = new Schema({
    Type:{
        type: Schema.Types.String,
        ref: "Type",
        default: "athelete",
    },
    SportName:{
        type: Schema.Types.String,
        ref: "SportName",
        default: "athletics",
    },
    Date:{
        type: Schema.Types.String,
        ref: "Date",
        default: "12/12/2021",
    },
    GroupStage: {
        type: Schema.Types.String,
        ref: "GroupStage",
        default: "Semi Final",
    },
    MatchName: {
        type: Schema.Types.String,
        ref: "MatchName",
        default: "Relay - 500m",
    },
    Player1: {
        type: Schema.Types.String,
        ref: "Player1",
        default: "Devam Desai",
    },
    Player2: {
        type: Schema.Types.String,
        ref: "Player2",
        default: "Om B",
    },
    Player3: {
        type: Schema.Types.String,
        ref: "Player3",
        default: "Rahul",
    },
}, { timestamps: true });

const AthleteResults = model("AthleteResults", athleteSchema);
export default AthleteResults;
