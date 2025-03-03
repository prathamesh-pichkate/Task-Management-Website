import mongoose from "mongoose";
import logger from "../utils/logger.js";


const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then((conn) => {
            logger.info(`Connected to MongoDB: ${conn.connection.host}`);
        })
        .catch((error) => {
            logger.error(`Mongodb connection error: ${error.message}`);
            process.exit(1); 
        });
};

export default connectDB;