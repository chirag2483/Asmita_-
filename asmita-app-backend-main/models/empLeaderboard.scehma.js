import mongoose from "mongoose";
const { Schema, model } = mongoose;

const empleaderboardSchema = new Schema({
    Name: {
        type: Schema.Types.String,
        default: "IIIT-A",
    },
    Logo: {
        type: Schema.Types.String,
        default:
            "https://t3.ftcdn.net/jpg/02/78/42/76/360_F_278427683_zeS9ihPAO61QhHqdU1fOaPk2UClfgPcW.jpg",
    },
    Points: {
        type: Schema.Types.Number,
        default: 20,
    },
});

const EmpLeaderboard = model("EmpLeaderboard", empleaderboardSchema);

export default EmpLeaderboard;
