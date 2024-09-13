import TeamAsmita from "../models/teamAsmita.schema.js";
import { response_200, response_500 } from "../utils/responseCodes.js";

export const getTeamAsmita = async (req, res) => {
    try {
        const asmitaTeam= await TeamAsmita.find({});
        response_200(res, "Successfully fetched!", asmitaTeam);
    } catch (err) {
        response_500(res, "Error occurred while fetching data", err);
    }
};
