import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';
import { error } from 'console';


//LOAD ENV VARIABLE
dotenv.config();

const port = process.env.PORT || 8080;


const startServer = async () => {
    try{
        await connectDB();

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch {
        console.log(`Database connection failed: ${error.message}`);
        process.exit(1);
    }
}

startServer();