import mongoose from "mongoose";
const { Schema, model } = mongoose;
//this is the second type of model for fixtures
//for two player sports
const fixtureSchema = new Schema(
    {
        Sport: {
            type: Schema.Types.String,
            default: "Football",
        },
        HTMLString: {
            type: Schema.Types.String,
            default: null,
        },
        Day: {
            type: Schema.Types.String,
            default: "0",
        },
    },
    { timestamps: true }
);

const Fixture = model("Fixture", fixtureSchema);

export default Fixture;
