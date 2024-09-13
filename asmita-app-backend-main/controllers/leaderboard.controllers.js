import Leaderboard from "../models/leaderboard.schema.js";
import LogDetails from "../models/logDetails.schema.js";
import User from "../models/user.schema.js";
import mongoose from "mongoose";
import { getCache, setCache } from "../utils/cache.js";
export const getLeaderboard = async (req, res) => {
    try {
        const cached = await getCache("leaderboard");
        if (cached) {
            return res.status(200).send({
                success: true,
                message: "Fetched Successfully",
                data: JSON.parse(cached),
            });
        } else {
            const data = await Leaderboard.find().sort({ Points: -1 });
            await setCache("leaderboard", JSON.stringify(data));
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

    try {
        // If not valid
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: `Invalid entry id: ${id}` });

        const updatedEntry = await Leaderboard.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        updatedEntry.save();
        console.log(updatedEntry);
        if (!updatedEntry)
            return res.status(404).json({
                message: `Leaderboard entry not found with id: ${id}`,
            });
        const agent = await User.findById(req.user.id);
        const details = `Updated Student Leaderboard by ${updatedEntry.Points} points to ${updatedEntry.Name}`;
        const newLog = await LogDetails.create({
            enrollment_no: agent.EnrollmentNo,
            details,
        });
        console.log(newLog);
        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

