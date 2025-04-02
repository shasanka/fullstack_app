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

    // Set HttpOnly cookie with the refresh token - only for /refresh path
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/v1/auth/refresh"  // Added path restriction
    });

    // Access token cookie remains available for all paths
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 60 * 1000
    });

    res.status(200).json({
      message: "Login successful",
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
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;

    // If no tokens are present, still allow logout to clear any client-side state
    if (!accessToken && !refreshToken) {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/v1/auth/refresh" // Match the login path restriction
      });
      res.status(200).json({ message: "Logout successful - no active session found" });
      return;
    }

    // Blacklist access token if it exists and is valid
    if (accessToken) {
      try {
        const decoded = AuthService.verifyToken(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        const expiresIn = Math.max(decoded.exp - currentTime, 0); // Ensure non-negative

        if (expiresIn > 0) {
          await AuthService.blacklistToken(accessToken, expiresIn);
        }
      } catch (err) {
        // Log the error but don't fail logout - cookie clearing is the priority
        console.warn("Failed to verify/blacklist access token:", 
          err instanceof Error ? err.message : err);
      }
    }

    // Blacklist refresh token if it exists (optional enhancement)
    if (refreshToken) {
      try {
        await AuthService.blacklistToken(refreshToken, 7 * 24 * 60 * 60); // Match login maxAge
      } catch (err) {
        console.warn("Failed to blacklist refresh token:", 
          err instanceof Error ? err.message : err);
      }
    }

    // Clear cookies with matching attributes from login
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/v1/auth/refresh" // Match the login path restriction
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Unexpected error during logout:", 
      err instanceof Error ? err.message : err);
    res.status(500).json({ message: "Internal server error" });
  }
}
  
  
  
}

export default new AuthController(); // Export an instance of the class