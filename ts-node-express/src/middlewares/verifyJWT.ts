import { NextFunction, Request, Response } from "express";
import AuthService from "@/services/AuthService";

const verifyJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized: No access token provided" });
      return;
    }

    // Check if the token is blacklisted
    const isBlacklisted = await AuthService.isTokenBlacklisted(accessToken);
    if (isBlacklisted) {
      res.status(403).json({ message: "Access token has been invalidated" });
      return;
    }

    try {
      // Verify the access token
      const decoded = AuthService.verifyToken(accessToken);
      req.user = decoded; // Attach decoded user information to request object
      next(); // Proceed to route handler
    } catch (accessErr) {
      if (accessErr instanceof Error) {
        // console.error("Access token invalid or expired:", accessErr.message);

        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
          res.status(401).json({ message: "Unauthorized: No refresh token provided" });
          return;
        }

        try {
          const newAccessToken = await AuthService.refreshAccessToken(refreshToken);

          req.headers.authorization = `Bearer ${newAccessToken}`;
          const decoded = AuthService.verifyToken(newAccessToken);
          req.user = decoded;

          next();
        } catch (refreshErr) {
          console.error("Refresh token invalid or expired:", refreshErr instanceof Error ? refreshErr.message : refreshErr);
          res.status(401).json({ message: "Unauthorized" });
        }
      } else {
        console.error("Unknown error verifying access token:", accessErr);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (err) {
    console.error("Error verifying JWT:", err instanceof Error ? err.message : err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export default verifyJWT;
