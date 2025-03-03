import express from 'express';
import {registerUser,loginUser,logoutUser} from "../controllers/user.controller.js"
import verifyJWT from '../middlewares/auth.middleware.js';

const router = express.Router();

// Register a new user
router.post('/register-user', registerUser);

// Login a user
router.post('/login-user', loginUser);

//Logout a user
router.post('/logout-user',verifyJWT, logoutUser);

export default router;