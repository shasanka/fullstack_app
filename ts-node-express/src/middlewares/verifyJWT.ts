import { NextFunction, Request, Response } from "express";
import AuthService from "@/services/AuthService";

const verifyJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Retrieve access token from cookies
    const accessToken = req.cookies?.accessToken;
    // console.log("🚀 ~ verifyJWT ~ accessToken:", accessToken)

    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized: No access token provided" });
      return;
    }

    // Check if the access token is blacklisted
    const isBlacklisted = await AuthService.isTokenBlacklisted(accessToken);
    if (isBlacklisted) {
      res.status(403).json({ message: "Access token has been invalidated" });
      return;
    }

    // Verify the access token
    const decoded = AuthService.verifyToken(accessToken);
    req.user = decoded; // Attach decoded user information to request object
    next(); // Proceed to route handler

  } catch (err) {
    console.error("Error verifying JWT:", err instanceof Error ? err.message : err);
    if (err instanceof Error && err.name === 'TokenExpiredError') {
      res.status(401).json({ message: "Access token expired" });
    } else {
      res.status(401).json({ message: "Unauthorized: Invalid access token" });
    }
    return;
  }
};

export default verifyJWT;
// export default verifyJWT;
