import AthleteResults from "../models/athelteresults.schema.js";
import FootballResults from "../models/footballresults.schema.js";
import CricketResults from "../models/cricketresults.schema.js";
import LogDetails from "../models/logDetails.schema.js";
import User from "../models/user.schema.js";
import { setCache, getCache } from "../utils/cache.js";
import { response_200, response_500 } from "../utils/responseCodes.js";

export const getAthleticsResultsById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await AthleteResults.findById(id);
        response_200(res, "successfully fetched result", data);
    } catch (err) {
        console.log(err);
        response_500(res, "failed to fetch result by id", err);
    }
};

export const getFootballResultsById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await FootballResults.findById(id);
        response_200(res, "successfully fetched result", data);
    } catch (err) {
        console.log(err);
        response_500(res, "failed to fetch result by id", err);
    }
};
export const getCricketResultsById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await CricketResults.findById(id);
        response_200(res, "successfully fetched result", data);
    } catch (err) {
        console.log(err);
        response_500(res, "failed to fetch result by id", err);
    }
};

export const getResultsController = async (req, res) => {
    try {
        const cached = await getCache("results");
        if (cached) {
            return res.status(200).send({
                success: true,
                message: "Fetched Successfully",
                data: JSON.parse(cached),
            });
        } else {
            const footballResults = await FootballResults.find({}).sort({ createdAt: -1 });
            const cricketResults = await CricketResults.find({}).sort({ createdAt: -1 });
            const athleteResults = await AthleteResults.find({}).sort({ createdAt: -1 });

            const data = [];
            data.push(...footballResults);
            data.push(...cricketResults);
            data.push(...athleteResults);

            await setCache("results", JSON.stringify(data));

            res.status(200).send({
                success: true,
                message: "Fetched Successfully",
                data,
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in getting results",
            error: error.message,
        });
    }
};

export const updateFootballResultController = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            ClgImg1,
            ClgImg2,
            ClgName1,
            ClgName2,
            Date,
            GroupStage,
            MatchName,
            Score,
            SportName,
        } = req.body;
        if (
            !ClgImg1 ||
            !ClgImg2 ||
            !ClgName1 ||
            !ClgName2 ||
            !Date ||
            !GroupStage ||
            !MatchName ||
            !Score ||
            !SportName
        ) {
            return res.status(500).send({ error: "Insufficient Data" });
        }
        const newResult = await FootballResults.findByIdAndUpdate(
            id,
            {
                ...req.body,
            },
            { new: true }
        );
        await newResult.save();
        const agent = await User.findById(req.user.id);
        const details = `Updated Football Result`;
        const newLog = await LogDetails.create({
            enrollment_no: agent.EnrollmentNo,
            details,
        });
        console.log(newLog);
        res.status(201).send({
            success: true,
            message: "Result Updated",
            newResult,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in updating results",
            error: error.message,
        });
    }
};

export const updateCricketResultController = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            ClgImg1,
            ClgImg2,
            ClgName1,
            ClgName2,
            Date,
            GroupStage,
            MatchName,
            Over1,
            Over2,
            Score1,
            Score2,
            SportName,
        } = req.body;
        if (
            !ClgImg1 ||
            !ClgImg2 ||
            !ClgName1 ||
            !ClgName2 ||
            !Date ||
            !GroupStage ||
            !MatchName ||
            !Score1 ||
            !Score2 ||
            !Over1 ||
            !Over2 ||
            !SportName
        ) {
            return res.status(500).send({ error: "Insufficient Data" });
        }
        const newResult = await CricketResults.findByIdAndUpdate(
            id,
            {
                ...req.body,
            },
            { new: true }
        );
        await newResult.save();
        const agent = await User.findById(req.user.id);
        const details = `Updated Cricket Result`;
        const newLog = await LogDetails.create({
            enrollment_no: agent.EnrollmentNo,
            details,
        });
        console.log(newLog);
        res.status(201).send({
            success: true,
            message: "Result Updated",
            newResult,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in updating results",
            error: error.message,
        });
    }
};

export const updateAtheleteResultController = async (req, res) => {
    try {
        const id = req.params.id;
        const { Date, GroupStage, MatchName, Player1, Player2, Player3, SportName } =
            req.body;
        if (
            !Date ||
            !GroupStage ||
            !MatchName ||
            !Player1 ||
            !Player2 ||
            !Player3 ||
            !SportName
        ) {
            return res.status(500).send({ error: "Insufficient Data" });
        }
        const newResult = await AthleteResults.findByIdAndUpdate(
            id,
            {
                ...req.body,
            },
            { new: true }
        );
        await newResult.save();
        const agent = await User.findById(req.user.id);
        const details = `Updated Athlete Result`;
        const newLog = await LogDetails.create({
            enrollment_no: agent.EnrollmentNo,
            details,
        });
        console.log(newLog);
        res.status(201).send({
            success: true,
            message: "Result Updated",
            newResult,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in updating results",
            error: error.message,
        });
    }
};

export const createFootballResultController = async (req, res) => {
    try {
        const {
            ClgImg1,
            ClgImg2,
            ClgName1,
            ClgName2,
            Date,
            GroupStage,
            MatchName,
            Score,
            SportName,
        } = req.body;
        if (
            !ClgImg1 ||
            !ClgImg2 ||
            !ClgName1 ||
            !ClgName2 ||
            !Date ||
            !GroupStage ||
            !MatchName ||
            !Score ||
            !SportName
        ) {
            return res.status(500).send({ error: "Insufficient Data" });
        }
        const newResult = await new FootballResults({
            ClgImg1,
            ClgImg2,
            ClgName1,
            ClgName2,
            Date,
            GroupStage,
            MatchName,
            Score,
            SportName,
            Type: "football",
        }).save();
        const agent = await User.findById(req.user.id);
        const details = `Created Football Result`;
        const newLog = await LogDetails.create({
            enrollment_no: agent.EnrollmentNo,
            details,
        });
        console.log(newLog);
        res.status(201).send({
            success: true,
            message: "Result Created",
            newResult,
        });
    } catch (error) {
        res.send(201).send({
            success: false,
            message: "Error in creating result",
            error: error.message,
        });
    }
};

export const createAthleteResultController = async (req, res) => {
    try {
        console.log(req.body);
        const { Date, GroupStage, MatchName, Player1, Player2, Player3, SportName } =
            req.body;
        console.log(Date);
        if (!Date) return res.status(500).send({ error: "Date" });
        if (
            !Date ||
            !GroupStage ||
            !MatchName ||
            !Player1 ||
            !Player2 ||
            !Player3 ||
            !SportName
        ) {
            return res.status(500).send({ error: "Insufficient Data3" });
        }
        const newResult = await new AthleteResults({
            Date,
            GroupStage,
            MatchName,
            Player1,
            Player2,
            Player3,
            SportName,
            Type: "athlete",
        }).save();
        const agent = await User.findById(req.user.id);
        const details = `Created Athlete Result`;
        const newLog = await LogDetails.create({
            enrollment_no: agent.EnrollmentNo,
            details,
        });
        console.log(newLog);
        res.status(201).send({
            success: true,
            message: "Result Created",
            newResult,
        });
    } catch (error) {
        res.send(201).send({
            success: false,
            message: "Error in creating result",
            error: error.message,
        });
    }
};

export const createCricketResultController = async (req, res) => {
    try {
        const { type } = req.body;

        const {
            ClgImg1,
            ClgImg2,
            ClgName1,
            ClgName2,
            Date,
            GroupStage,
            MatchName,
            Over1,
            Over2,
            Score1,
            Score2,
            SportName
        } = req.body;
        if (
            !ClgImg1 ||
            !ClgImg2 ||
            !ClgName1 ||
            !ClgName2 ||
            !Date ||
            !GroupStage ||
            !MatchName ||
            !Score1 ||
            !Score2 ||
            !Over1 ||
            !Over2 ||
            !SportName
        ) {
            return res.status(500).send({ error: "Insufficient Data" });
        }

        const newResult = await new CricketResults({
            ClgImg1,
            ClgImg2,
            ClgName1,
            ClgName2,
            Date,
            GroupStage,
            MatchName,
            Over1,
            Over2,
            Score1,
            Score2,
            SportName,
            Type: "cricket",
        }).save();
        const agent = await User.findById(req.user.id);
        const details = `Created Cricket Result`;
        const newLog = await LogDetails.create({
            enrollment_no: agent.EnrollmentNo,
            details,
        });
        console.log(newLog);
        res.status(201).send({
            success: true,
            message: "Result Created",
            newResult,
        });
    } catch (error) {
        res.send(201).send({
            success: false,
            message: "Error in creating result",
            error: error.message,
        });
    }
};

export const deleteAthleteResultController = async (req, res) => {
    try {
        const prod = await AthleteResults.findByIdAndDelete(req.params.id);
        const agent = await User.findById(req.user.id);
        const details = `Deleted Athlete Result`;
        const newLog = await LogDetails.create({
            enrollment_no: agent.EnrollmentNo,
            details,
        });
        console.log(newLog);
        res.status(200).send({
            success: true,
            message: "Successfully Deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete",
            error,
        });
    }
};

export const deleteFootballResultController = async (req, res) => {
    try {
        const prod = await FootballResults.findByIdAndDelete(req.params.id);
        const agent = await User.findById(req.user.id);
        const details = `Deleted Athlete Result`;
        const newLog = await LogDetails.create({
            enrollment_no: agent.EnrollmentNo,
            details,
        });
        console.log(newLog);
        res.status(200).send({
            success: true,
            message: "Successfully Deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete",
            error,
        });
    }
};
export const deleteCricketResultController = async (req, res) => {
    try {
        const prod = await CricketResults.findByIdAndDelete(req.params.id);
        const agent = await User.findById(req.user.id);
        const details = `Deleted Cricket Result`;
        const newLog = await LogDetails.create({
            enrollment_no: agent.EnrollmentNo,
            details,
        });
        console.log(newLog);
        res.status(200).send({
            success: true,
            message: "Successfully Deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete",
            error,
        });
    }
};
