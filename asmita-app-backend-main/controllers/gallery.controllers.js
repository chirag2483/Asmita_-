
import Gallery from "../models/gallery.schema.js";
import { response_200, response_500 } from "../utils/responseCodes.js";

export const getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.find({});
        response_200(res, "Successfully fetched!", gallery);
    } catch (err) {
        response_500(res, "Error occurred while fetching data", err);
    }
};
