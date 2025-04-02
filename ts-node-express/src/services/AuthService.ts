import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "@/config/config";
import { redisClient } from "@/middlewares/lib/redisClient";
// import redisClient from "@/middlewares/lib/redisClient";

class AuthService {
    private static ACCESS_TOKEN_SECRET = config.JWT_SECRET as string; // Access token secret
    private static REFRESH_TOKEN_SECRET = config.REFRESH_TOKEN_SECRET as string; //

    // Method to register a user
    async registerUser(
        username: string,
        email: string,
        password: string
    ): Promise<{ id: string; username: string; email: string }> {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("Email is already registered");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        return { id: newUser._id.toString(), username: newUser.username, email: newUser.email };
    }

    // Method to log in a user
    async loginUser(
        email: string,
        password: string
    ): Promise<{ accessToken: string; refreshToken: string }> {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid email or password");
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        // Generate access and refresh tokens
        const accessToken = this.generateAccessToken(user._id.toString(), user.email);
        const refreshToken = this.generateRefreshToken(user._id.toString());

        return { accessToken, refreshToken };
    }

    // Method to generate an access token
    private generateAccessToken(userId: string, email: string): string {
        return jwt.sign(
            { id: userId, email }, // Payload
            AuthService.ACCESS_TOKEN_SECRET, // Secret key
            { expiresIn: "10m" } // Token expiration (short-lived)
        );
    }

    // Method to generate a refresh token
    private generateRefreshToken(userId: string): string {
        return jwt.sign(
            { id: userId }, // Payload (minimal information)
            AuthService.REFRESH_TOKEN_SECRET, // Secret key
            { expiresIn: "7d" } // Token expiration (long-lived)
        );
    }

    // Method to verify an access token
    verifyToken(token: string): { id: string; email: string; exp: number } {
        try {
            const decoded = jwt.verify(token, AuthService.ACCESS_TOKEN_SECRET) as {
                id: string;
                email: string;
                exp: number; // Include expiration time
            };
            return decoded; // Return decoded payload
        } catch (err) {
            throw new Error("Invalid or expired access token");
        }
    }

    async blacklistToken(token: string, expiresIn: number): Promise<void> {
        const blacklistKey = `bl_${token}`;
        await redisClient.set(blacklistKey, "true", { EX: expiresIn }); // Set expiration time in seconds
    }

    async isTokenBlacklisted(token: string): Promise<boolean> {
        const isBlacklisted = await redisClient.get(`bl_${token}`);
        return Boolean(isBlacklisted);
    }

    // Method to verify a refresh token
    verifyRefreshToken(token: string): { id: string } {
        try {
            const decoded = jwt.verify(token, AuthService.REFRESH_TOKEN_SECRET) as {
                id: string;
            };
            return decoded; // Return decoded payload
        } catch (err) {
            throw new Error("Invalid or expired refresh token");
        }
    }

    // Method to generate a new access token using a valid refresh token
    async refreshAccessToken(refreshToken: string): Promise<string> {
        try {
            const decodedRefreshToken = this.verifyRefreshToken(refreshToken);

            // Find the user associated with the refresh token (optional for additional validation)
            const user = await User.findById(decodedRefreshToken.id);
            if (!user) {
                throw new Error("User not found");
            }

            // Generate a new access token
            return this.generateAccessToken(user._id.toString(), user.email);
        } catch (err) {
            throw new Error("Unable to generate new access token");
        }
    }


}

export default new AuthService(); // Export an instance of the class
