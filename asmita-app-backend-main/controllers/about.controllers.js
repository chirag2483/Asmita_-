import About from "../models/about.schema.js";
import { response_200, response_500 } from "../utils/responseCodes.js";

export const getAbout = async (req, res) => {
    try {
        const about = await About.find({});
        response_200(res, "Successfully fetched!", about);
    } catch (err) {
        response_500(res, "Error occurred while fetching data", err);
    }
};
