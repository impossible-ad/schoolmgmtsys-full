import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/dbconnect.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import teacherRouter from './routes/teacher.routes.js';
import vacancyRouter from './routes/vacancy.route.js';
import { globalErrorHandler } from './middlewares/globalerrorhandler.js';


dotenv.config();

const app = express();
const port = process.env.port;


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//to parse json request bodies;middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/vacancy", vacancyRouter);
app.use(globalErrorHandler);
app.use("/uploads", express.static("uploads"));


try {
    await db.connect();
    console.log("MySQL Connected Successfully!");
} catch (err) {
    console.error("MySQL Connection Failed:", err.message);
}


// Arrow Functioin is used here.
app.listen(port, () => {
    console.log(`server is running in port ${port}`)
})