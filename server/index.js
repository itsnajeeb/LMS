import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js'
import courseRoutre from './routes/course.route.js'
import mediaRoute from './routes/media.route.js'
import cookieParser from 'cookie-parser';
import purchaseRoute from './routes/purchaseCourse.route.js'
import courseProgressRoute from './routes/courseProgress.route.js'
import cors from 'cors'
import path from 'path'
dotenv.config({})
const app = express();

const PORT = process.env.PORT || 3000;

const DIRNAME = path.resolve()


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
app.use('/api/v1/media', mediaRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/course', courseRoutre)
app.use('/api/v1/purchase', purchaseRoute)
app.use('/api/v1/progress', courseProgressRoute)


app.use(express.static(path.join(DIRNAME, "/client/dist")))
app.use(/.*/, (_, res) => {
    res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"))
})


app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);

})