import Log from "../models/logDetails.schema.js";
import { response_200, response_500 } from "../utils/responseCodes.js";

export const getLogs = async (req, res) => {
    try {
        const logs = await Log.find({});
        logs.sort((a, b) => b.createdAt - a.createdAt);
        response_200(res, "Successfully fetched logs!", logs);
    } catch (err) {
        response_500(res, "Error occurred while fetching logs", err);
    }
};
