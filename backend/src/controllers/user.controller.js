
import User from "../models/user.model.js"
import generateAccessAndRefreshToken from "../utils/generateAccessRefreshToken.js"
import logger from "../utils/logger.js"
import {validateRegistration,validateLogin} from "../utils/validation.js"


//Register the user
const registerUser = async (req, res) => {
    logger.info("Registering a new user endpoint hits...");
    try {
        const {error} = validateRegistration(req.body);
        if(error){
            return res.status(400).json({
                success: false,
                message: `Register Validation error ,${error.details[0].message}`
            })
        }

        const { fullname,username,email,password} = req.body;
  
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
          logger.warn("User already exists");
          return res.status(400).json({
            success: false,
            message: "User already exists",
          });
        }

        user = new User({
            fullname,
            username,
            email,
            password
        });

        await user.save();
        logger.info("User registered successfully");
       
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',// Only secure in production
            sameSite: "Lax" 
        };

        res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            message: "User registered successfully",
            accessToken,
            refreshToken
        });


    } catch (error) {
        logger.error("Registration error occured", error);
        res.status(500).json({
          success: false,
          message: "Registration error occured",
        });
    }
};


//Login the user:
const loginUser = async (req, res) => {
    logger.info("User login endpoint hit...");
        try {
          //validate the schema
          const {error} = validateLogin(req.body);
          if(error){
            logger.warn("Validation error", error.details[0].message);
            return res.status(400).json({
              success: false,
              message: error.details[0].message
            });
          }
      
          const {email,password} = req.body;
          
          let user = await User.findOne({email});
          if(!user){
            logger.warn("User not found");
            return res.status(400).json({
              success: false,
              message: "User not found"
            });
          }
      
          //validate the password
          const validatePassword = await user.isPasswordCorrect(password);

          if(!validatePassword){
            logger.warn("Invalid password");
            return res.status(400).json({
              success: false,
              message: "Invalid password"
            });
          }
      
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: "Lax"
        };

        res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            success: true,
            message: "User logged in successfully",
            accessToken,
            refreshToken
        });
        } catch (e) {
          logger.error("Login error occured", e);
          res.status(500).json({
            success: false,
            message: "Logie error occured",
          });
        }
      }

  

  //Logout the user
  const logoutUser = async (req, res) => {
    logger.info("User logout endpoint hit...");

    try {
        // Extract refresh token from cookies
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({ success: false, message: "No refresh token provided" });
        }

        // Find user by refresh token and remove it
        const user = await User.findOneAndUpdate(
            { refreshToken },
            { $unset: { refreshToken: 1 } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found or already logged out" });
        }

        // Clear authentication cookies
        const options = { httpOnly: true, secure: true, sameSite: "Strict" };
        res.clearCookie("accessToken", options);
        res.clearCookie("refreshToken", options);

        logger.info(`User ${user._id} logged out successfully`);
        return res.status(200).json({ status: true, message: "User logged out successfully" });

    } catch (error) {
        logger.error("Logout error occurred", error);
        res.status(500).json({ success: false, message: "Logout error occurred" });
    }
};




    const refreshAccessToken = async (req, res) => {
      const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  
      if (!incomingRefreshToken) {
          logger.info("No refresh token provided");
          return res.status(401).json({ status: false, message: "No refresh token provided" });
      }
  
      try {
          const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  
          const user = await User.findById(decodedToken?._id); // ✅ Fixed missing `await`
          if (!user) {
              logger.info("User not found");
              return res.status(401).json({ status: false, message: "Invalid refresh token or user" }); // ✅ Added `return`
          }
  
          if (incomingRefreshToken !== user.refreshToken) {
              logger.info("Invalid refresh token");
              return res.status(401).json({ status: false, message: "Refresh token is invalid or expired" }); // ✅ Added `return`
          }
  
          // Generate new tokens
          const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);
  
          const options = {
              httpOnly: true,
              secure: true,
              sameSite: "Strict",
          };
  
          return res
              .status(200)
              .cookie("accessToken", accessToken, options)
              .cookie("refreshToken", newRefreshToken, options) // ✅ Fixed refreshToken storage
              .json({
                  status: true,
                  message: "Access token and refresh token generated successfully",
                  accessToken,
                  newRefreshToken,
              });
      } catch (error) {
          logger.error("Refresh token error occurred", error);
          return res.status(500).json({ status: false, message: "Refresh token error occurred" }); 
      }
  };


    

   
    
    
export {registerUser,loginUser,logoutUser,refreshAccessToken};