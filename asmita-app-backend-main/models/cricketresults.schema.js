import mongoose from "mongoose";
const { Schema, model } = mongoose;
//this is the second type of model for fixtures
const cricketSchema = new Schema({
    Type: {
        type: Schema.Types.String,
        ref: "Type",
        default: "cricket",
    },
    SportName:{
        type: Schema.Types.String,
        ref: "SportName",
        default: "cricket",
    },
    ClgImg1: {
        type: Schema.Types.String,
        default:
            "https://t3.ftcdn.net/jpg/02/78/42/76/360_F_278427683_zeS9ihPAO61QhHqdU1fOaPk2UClfgPcW.jpg",
    },
    ClgImg2: {
        type: Schema.Types.String,
        default:
            "https://t3.ftcdn.net/jpg/02/78/42/76/360_F_278427683_zeS9ihPAO61QhHqdU1fOaPk2UClfgPcW.jpg",
    },

    ClgName1: {
        type: Schema.Types.String,
        default: "IIIT-A",
    },
    ClgName2: {
        type: Schema.Types.String,
        default: "IIIT-A",
    },
    Date: {
        type: Schema.Types.String,
        default: "12/12/2021",
    },
    GroupStage: {
        type: Schema.Types.String,
        default: "Semi Final",
    },
    MatchName: {
        type: Schema.Types.String,
        default: "Relay - 500m",
    },
    Over1: {
        type: Schema.Types.String,
        default: "20",
    },
    Over2: {
        type: Schema.Types.String,
        default: "20",
    },
    Score1: {
        type: Schema.Types.String,
        default: "200/10",
    },
    Score2: {
        type: Schema.Types.String,
        default: "180/2",
    },
}, { timestamps: true });

const CricketResults = model("CricketResults", cricketSchema);
export default CricketResults;
