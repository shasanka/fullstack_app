import { NextFunction, Request, Response } from "express";
import AuthService from "@/services/AuthService";

const verifyJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1]; // Extract access token from Authorization header

    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized: No access token provided" });
      return;
    }

    try {
      // Verify the access token
      const decoded = AuthService.verifyToken(accessToken);
      req.user = decoded; // Attach decoded user information to request object
      next(); // Proceed to route handler
    } catch (accessErr) {
      if (accessErr instanceof Error) {
        console.error("Access token invalid or expired:", accessErr.message);

        // Access token is invalid; check refresh token
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
          res.status(401).json({ message: "Unauthorized: No refresh token provided" });
          return;
        }

        try {
          // Verify the refresh token and generate a new access token
          const newAccessToken = await AuthService.refreshAccessToken(refreshToken);

          // Attach the new access token to the request headers for downstream processing
          req.headers.authorization = `Bearer ${newAccessToken}`;

          // Optionally attach decoded user info from the new access token
          const decoded = AuthService.verifyToken(newAccessToken);
          req.user = decoded;

          next(); // Proceed to route handler
        } catch (refreshErr) {
          if (refreshErr instanceof Error) {
            console.error("Refresh token invalid or expired:", refreshErr.message);
            res.status(401).json({ message: "Unauthorized: Invalid or expired refresh token" });
            return;
          }
        }
      } else {
        console.error("Unknown error verifying access token:", accessErr);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (err) {
    console.error("Error verifying JWT:", err);
    res.status(500).json({ message: err instanceof Error ? err.message : "Internal server error" });
  }
};

export default verifyJWT;
