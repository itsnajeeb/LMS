import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected !");
    } catch (error) {
        console.log("Database Connection Failed ", error);
    }

}
export default connectDB;