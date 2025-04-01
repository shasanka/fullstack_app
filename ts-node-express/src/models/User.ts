import mongoose, { Schema, Document } from 'mongoose';

// Define the User interface for TypeScript
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId; // Explicitly define _id as ObjectId
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}

// Create the User schema
const UserSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true, // Ensure email is unique
            lowercase: true,
            trim: true,
            match: [
                /^\S+@\S+\.\S+$/,
                'Please provide a valid email address',
            ], // Regex for email validation
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        createdAt: {
            type: Date,
            default: Date.now, // Automatically set the creation date
        },
    },
    {
        timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    }
);

// Create the User model
const User = mongoose.model<IUser>('User', UserSchema);

export default User;