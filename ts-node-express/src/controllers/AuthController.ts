import AuthService from "@/services/AuthService";
import { Request, Response } from "express";

interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

class AuthController {
  // Method to handle user registration
  async register(req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      // Validate request body
      if (!username || !email || !password) {
        res.status(400).json({ message: "Username, email, and password are required" });
        return;
      }

      // Call the service to register the user
      const user = await AuthService.registerUser(username, email, password);

      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (err) {
      // Narrow down the type of `err`
      if (err instanceof Error) {
        console.error("Error registering user:", err.message);

        if (err.message === "Email is already registered") {
          res.status(409).json({ message: err.message });
        } else {
          res.status(500).json({ message: "Internal server error" });
        }
      } else {
        console.error("Unknown error occurred:", err);
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  // Method to handle user login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validate request body
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
      }

      // Call the service to log in the user
      const { accessToken, refreshToken } = await AuthService.loginUser(email, password);

      // Set HttpOnly cookie with the refresh token
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration (7 days)
      });

      res.status(200).json({
        message: "Login successful",
        accessToken, // Send access token in response body
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error logging in:", err.message);

        if (err.message === "Invalid email or password") {
          res.status(401).json({ message: err.message });
        } else {
          res.status(500).json({ message: "Internal server error" });
        }
      } else {
        console.error("Unknown error occurred:", err);
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];

        if (!accessToken) {
            res.status(400).json({ message: "No access token provided" });
            return;
        }

        const decoded = AuthService.verifyToken(accessToken);

        // Calculate remaining expiration time of the token (in seconds)
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const expiresIn = decoded.exp - currentTime;

        if (expiresIn > 0) {
            await AuthService.blacklistToken(accessToken, expiresIn); // Add to blacklist
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.error("Error during logout:", err instanceof Error ? err.message : err);
        res.status(500).json({ message: "Internal server error" });
    }
}
  
}

export default new AuthController(); // Export an instance of the class