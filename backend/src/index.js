import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import connectDB from "../src/utils/db.js"
import userRoute from "../src/routers/user.router.js"
import cookieParser from "cookie-parser"; 
import taskRoute from "../src/routers/task.router.js"


const app = express();
const PORT = process.env.PORT || 5000;

//connect to db
connectDB();

//add the middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); 

//add the routes
app.use("/api/auth",userRoute);
app.use("/api/task",taskRoute);
// app.use("/api/task",taskRoute);


//listen to the port
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})