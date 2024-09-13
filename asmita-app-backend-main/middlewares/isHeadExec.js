import jwt from "jsonwebtoken";
import { response_500 } from "../utils/responseCodes.js";
const SECRET_KEY = "h92h398n9hf7sgbrf8hia7";

const headExecMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        const user = jwt.verify(token, SECRET_KEY);
        console.log("=====================================\n\n");
        console.log("user: ", user);
        console.log("=====================================\n\n");
        if (user.role === "head" || user.role === "executive") {
            req.user = { id: user.id, role: user.role };

            next();
        } else {
            return res.status(403).json({ message: "You are not authorized" });
        }
    } catch (err) {
        console.log(
            "Error occurred while parsing request in middleware (headExec)"
        );
        response_500(
            res,
            "Error occurred while parsing request in middleware (headExec)",
            err
        );
    }
};

const executiveMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        const user = jwt.verify(token, SECRET_KEY);

        if (user.role === "executive") {
            req.user = { id: user.id, role: user.role };

            next();
        } else {
            return res.status(403).json({ message: "You are not authorized" });
        }
    } catch (err) {
        console.log(
            "Error occurred while parsing request in middleware (executive)"
        );
        response_500(
            res,
            "Error occurred while parsing request in middleware (executive)",
            err
        );
    }
};

const headMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        const user = jwt.verify(token, SECRET_KEY);
        if (user.role === "head") {
            req.user = { id: user.id, role: user.role };
            next();
        } else {
            return res.status(403).json({ message: "You are not authorized" });
        }
    } catch (err) {
        console.log(
            "Error occurred while parsing request in middleware (head)"
        );
        response_500(
            res,
            "Error occurred while parsing request in middleware (head)",
            err
        );
    }
};

const allMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        const user = jwt.verify(token, SECRET_KEY);
        if (
            user.role === "head" ||
            user.role === "executive" ||
            user.role === "volunteer"
        ) {
            req.user = { id: user.id, role: user.role };
            next();
        } else {
            return res.status(403).json({ message: "You are not authorized" });
        }
    } catch (err) {
        console.log("Error occurred while parsing request in middleware (all)");
        response_500(
            res,
            "Error occurred while parsing request in middleware (all)",
            err
        );
    }
};

export {
    headExecMiddleware,
    headMiddleware,
    executiveMiddleware,
    allMiddleware,
};
