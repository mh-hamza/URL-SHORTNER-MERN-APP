import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 5000)
    console.log("Mongo DB connected Successfully")
  } catch (error) {
    console.log("faild to connect mongo db" + error)
  }
}
export default connectToMongoDB