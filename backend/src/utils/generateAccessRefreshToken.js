import User from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        console.log("Generated Refresh Token:", refreshToken);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Log the user object after saving to confirm refreshToken is saved
        const updatedUser = await User.findById(userId);
        console.log("Updated User with Refresh Token:", updatedUser);

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the tokens!");
    }
};


export default generateAccessAndRefreshToken;