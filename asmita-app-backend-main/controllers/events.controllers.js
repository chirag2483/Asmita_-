import Event from "../models/event.schema.js";
import { response_200, response_500 } from "../utils/responseCodes.js";

export const getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        response_200(res, "Successfully fetched!", events);
    } catch (err) {
        response_500(res, "Error occurred while fetching data", err);
    }
};
