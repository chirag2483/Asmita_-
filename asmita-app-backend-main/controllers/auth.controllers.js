import User from "../models/user.schema.js";
import {
    response_200,
    response_400,
    response_404,
    response_500,
} from "../utils/responseCodes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET_KEY = "h92h398n9hf7sgbrf8hia7";
const saltRounds = 10;

export const loginUser = async (req, res) => {
    try {
        const enrollment = req.body.enrollment;
        const password = req.body.password;
        const loginUser = await User.findOne({
            EnrollmentNo: enrollment.toLowerCase(),
        });
        if (!loginUser) {
            console.log("User does not exist.");
            response_404(res, "Such user does not exist.");
        } else {
            bcrypt
                .compare(password, loginUser.Password)
                .then(function (result) {
                    if (result) {
                        response_200(res, "Successfully logged in user", {
                            user: {
                                ...loginUser._doc,
                                token: jwt.sign(
                                    {
                                        id: loginUser._id,
                                        role: loginUser.Role,
                                    },
                                    SECRET_KEY,
                                    { expiresIn: "1h" }
                                ),
                            },
                        });
                    } else {
                        console.log(
                            "Could not login user. Please check the password again."
                        );
                        response_400(
                            res,
                            "Could not login user. Please check the password again."
                        );
                    }
                });
        }
    } catch (err) {
        console.log("Error: ", err);
        response_500(res, "Error occurred while logging in user.", err);
    }
};

export const registerUser = async (req, res) => {
    try {
        const name = req.body.name;
        const enrollment = req.body.enrollment;
        const password = req.body.password;
        const role = req.body.role;

        if (!name || !enrollment || !password) {
            response_400(res, "Enter all fields (name, enrollment, password)");
        } else {
            bcrypt.hash(password, saltRounds).then(async function (hash) {
                const createdUser = await User.create({
                    Name: name,
                    EnrollmentNo: enrollment.toLowerCase(),
                    Password: hash,
                    Role: role,
                });
                console.log("Successfully created new user!");
                response_200(
                    res,
                    "Successfullly created new user",
                    createdUser
                );
            });
        }
    } catch (err) {
        response_500(res, "Error occurred while creating new user", err);
    }
};
