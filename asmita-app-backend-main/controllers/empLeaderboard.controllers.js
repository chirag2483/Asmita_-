import EmpLeaderboard from "../models/empLeaderboard.scehma.js";
import LogDetails from "../models/logDetails.schema.js";
import User from "../models/user.schema.js";
import mongoose from "mongoose";
import { getCache, setCache } from "../utils/cache.js";
import {
    response_200,
    response_404,
    response_500,
} from "../utils/responseCodes.js";
export const getLeaderboard = async (req, res) => {
    try {
        const cached = await getCache("empLeaderboard");
        if (cached) {
            return res.status(200).send({
                success: true,
                message: "Fetched Successfully",
                data: JSON.parse(cached),
            });
        } else {
            const data = await EmpLeaderboard.find().sort({ Points: -1 });
            await setCache("empLeaderboard", JSON.stringify(data));
            res.status(200).send({
                success: true,
                message: "Fetched Successfully",
                data,
            });
        }
    } catch (error) {
        console.log(error);
        res.send(500).json({ message: error.message });
    }
};

export const updateLeaderboardEntry = async (req, res) => {
    const { id } = req.params;
    const newPoints = req.body.Points;
    console.log("req.user: ", req.user);
    try {
        // If not valid
        if (!mongoose.Types.ObjectId.isValid(id))
            return response_404(res, `Invalid entry id: ${id}`);

        const updatedEntry = await EmpLeaderboard.findByIdAndUpdate(
            id,
            { Points: newPoints },
            { new: true }
        );

        console.log(updatedEntry);
        if (!updatedEntry)
            return response_404(
                res,
                `Leaderboard entry with entry id not found: ${id}`
            );
        const agent = await User.findById(req.user.id);
        const details = `Updated Employee Leaderboard by ${updatedEntry.Points} points to ${updatedEntry.Name}`;
        const newLog = await LogDetails.create({
            enrollment_no: agent.EnrollmentNo,
            details,
        });
        console.log(newLog);
        response_200(
            res,
            "Successfully updated employee leaderboard id",
            updatedEntry
        );
    } catch (err) {
        response_500(
            res,
            "Error occurred while updating employee leaderboard",
            err
        );
    }
};
