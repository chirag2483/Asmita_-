import Fixture from "../models/fixture.schema.js";
import LogDetails from "../models/logDetails.schema.js";
import User from "../models/user.schema.js";
import {
    response_200,
    response_400,
    response_404,
    response_500,
} from "../utils/responseCodes.js";
import { getCache, setCache } from "../utils/cache.js";

export async function getAllFixtures(req, res) {
    try {
        const cached = await getCache("allFixtures");
        if (cached) {
            return res.status(200).send({
                success: true,
                message: "Fetched Successfully",
                data: JSON.parse(cached),
            });
        } else {
            const fixtures = await Fixture.find({});

            fixtures.sort(function (a, b) {
                return a.Day - b.Day;
            });
            console.log(fixtures);
            await setCache("allFixtures", JSON.stringify(fixtures));
            response_200(res, "Successfully fetched all fixtures", fixtures);
        }
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while fetching all fixtures", err);
    }
}

export const getUpcomingFixtures = async (req, res) => {
    try {
        const cached = await getCache("upcomingFixtures");
        if (cached) {
            return res.status(200).send({
                success: true,
                message:
                    "Successfully fetching upcoming fixtures (recently created)",
                data: JSON.parse(cached),
            });
        } else {
            const fixt = await Fixture.find().sort({ createdAt: -1 }).limit(5);
            console.log(fixt);
            await setCache("upcomingFixtures", JSON.stringify(fixt));
            response_200(
                res,
                "Successfully fetching upcoming fixtures (recently created)",
                fixt
            );
        }
    } catch (err) {
        console.log(err);
        response_500(
            res,
            "Error occurred while fetching upcoming fixtures",
            err
        );
    }
};

export async function getBySport(req, res) {
    // ALL SPORT NAMES SHOULD BE LOWER CASE IN THE DROPDOWN
    const sportName = req.params.sport;
    try {
        const cached = await getCache("sportFixtures:" + sportName);
        if (cached) {
            return res.status(200).send({
                success: true,
                message: "Fetched Successfully",
                data: JSON.parse(cached),
            });
        } else {
            const sportFixtures = await Fixture.find({
                Sport: sportName,
            });
            await setCache(
                "sportFixtures:" + sportName,
                JSON.stringify(sportFixtures)
            );
            response_200(
                res,
                `Successfully fetched ${sportName} fixtures`,
                sportFixtures
            );
        }
    } catch (err) {
        console.log(`Error occurred while fetching ${sportName}`);
        response_500(res, `Error occurred while fetching ${sportName}`, err);
    }
}

export async function getByDay(req, res) {
    const sportName = req.params.sport; //cricket, football, swimming, athletics, tabletennis, tennis, etc. keep as dropdown
    const day = req.params.day; //1,2,3,4
    try {
        const cached = await getCache("dayFixtures:" + sportName + ":" + day);
        if (cached) {
            return res.status(200).send({
                success: true,
                message: "Fetched Successfully",
                data: JSON.parse(cached),
            });
        } else {
            const checkDay = await Fixture.find({
                Sport: sportName,
                Day: day,
            });
            if (checkDay.length === 0) {
                response_404(
                    res,
                    `No fixtures available for Day ${day} of ${sportName}`
                );
            } else {
                await setCache(
                    "dayFixtures:" + sportName + ":" + day,
                    JSON.stringify(checkDay)
                );
                response_200(
                    res,
                    `Successfully fetched Day ${day} fixtures of ${sportName}`,
                    checkDay
                );
            }
        }
    } catch (err) {
        console.log(err);
        response_500(res, "Error while fetching sport results by day", err);
    }
}

export async function deleteFixture(req, res) {
    try {
        const fixtureId = req.params.id;
        console.log("ID: ", fixtureId);
        const deleteFixture = await Fixture.findByIdAndDelete(fixtureId);
        console.log("deleteFixture: ", deleteFixture);
        if (deleteFixture) {
            const agent = await User.findById(req.user.id);
            const details = `Deleted Fixture of ${deleteFixture.Day}, ${deleteFixture.Sport}`;
            const newLog = await LogDetails.create({
                enrollment_no: agent.EnrollmentNo,
                details,
            });
            console.log(newLog);
            console.log("Deleted fixture: ", deleteFixture);
            response_200(res, "Successfully deleted fixture!", deleteFixture);
        } else {
            console.log("Error occurred while deleting fixture.");
            response_400(res, "Unable to delete fixture");
        }
    } catch (err) {
        console.log(err);
        response_500(res, "Error occurred while deleting fixture", err);
    }
}

export async function createFixture(req, res) {
    // drop down on admin side
    try {
        const { Sport, Day, Date, HTMLString } = req.body;
        console.log("fixture body: ", req.body);
        const addFixture = await Fixture.create(req.body);

        if (addFixture) {
            const agent = await User.findById(req.user.id);
            const details = `Created New Fixture for ${addFixture.Day}, $${addFixture.Sport}`;
            const newLog = await LogDetails.create({
                enrollment_no: agent.EnrollmentNo,
                details,
            });
            console.log(newLog);
            console.log(
                `Successfully added fixture for Day ${Day} of ${Sport}`
            );
            response_200(
                res,
                `Successfully added fixture for Day ${Day} of ${Sport}`,
                addFixture
            );
        }
    } catch (err) {
        console.log(`Error occurred while creating fixture`);
        response_500(res, `Error occurred while creating fixture`, err);
    }
}

export async function updateFixture(req, res) {
    try {
        const fixtureId = req.params.id;
        const newBody = req.body;
        const updFixture = await Fixture.findByIdAndUpdate(fixtureId, newBody, {
            new: true,
        });
        if (updFixture) {
            const agent = await User.findById(req.user.id);
            const details = `Updated Fixture to ${updFixture.Day}, ${updFixture.Sport}`;
            const newLog = await LogDetails.create({
                enrollment_no: agent.EnrollmentNo,
                details,
            });
            console.log(newLog);
            console.log("Successfully updated fixture");
            response_200(res, "Successfully updated fixture", updFixture);
        } else {
            console.log("Failure while updating fixture");
            response_400(res, "Failure while updating fixture");
        }
    } catch (err) {
        console.log(err);
        response_500(res, `Error occurred while updating fixture`, err);
    }
}
