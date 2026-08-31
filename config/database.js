import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected : ${connect.connection.host}`);
    } catch {
        console.error(`Database Connection Error : ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;