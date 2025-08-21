import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js';
dotenv.config({})
const app = express();

const PORT = process.env.PORT || 3000;

//Connect to DB
connectDB()

app.listen(PORT, ()=>{
    console.log(`Server is listening at ${PORT}`);
    
})