import config from '@/config/config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // Load environment variables



if (!config.MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
}

export async function run() { // Export the function
    try {
        await mongoose.connect(config.MONGO_URI ) ;
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err; // Re-throw the error for proper handling
    }
}
