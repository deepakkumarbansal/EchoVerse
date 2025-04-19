import { connect } from "mongoose"
import { DB_NAME } from "../constants.js"

export const connectDB = async () => {
    try {
        const connectionInstance = await connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}