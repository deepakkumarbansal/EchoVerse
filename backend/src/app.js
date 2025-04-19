import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({
    path: '../.env'
});
const app = express();
const corsOptions = {
    origin: process.env.CORS_URL,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true , limit: '16kb'}));
app.use(cookieParser());

// import routes
import userRouter from "./routes/user.routes.js"
import audioRouter from "./routes/audio.routes.js"

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to the Audio API"
    });
})
app.use('/api/user', userRouter);
app.use('/api/audio', audioRouter);

export {app};