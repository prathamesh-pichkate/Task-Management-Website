import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

const verifyJWT = async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        console.log("Extracted Token:", token);

        if (!token || typeof token !== "string" || token.trim() === "") {
            logger.error("Invalid Access Token: Token not found");
            return res.status(401).json({
                success: false,
                message: "Invalid access token",
            });
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            logger.error("Invalid or expired access token");
            return res.status(401).json({
                success: false,
                message: "Invalid or expired access token",
            });
        }

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            logger.error("Invalid Access Token: User not found");
            return res.status(401).json({
                success: false,
                message: "Invalid access token",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        logger.error(`JWT Verification Error: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export default verifyJWT;
