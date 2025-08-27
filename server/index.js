import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js'
import courseRoutre from './routes/course.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config({})
const app = express();

const PORT = process.env.PORT || 3000;
//Connect to DB
connectDB()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

//apis
app.use('/api/v1/user', userRoute)
app.use('/api/v1/course', courseRoutre)





app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);

})