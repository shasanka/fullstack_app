import { NextFunction, Request, Response } from "express";
import AuthService from "@/services/AuthService";

// const verifyJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     // Retrieve access token from cookies
//     const accessToken = req.cookies?.accessToken;

//     if (!accessToken) {
//       // If no access token is provided, check for a refresh token
//       const refreshToken = req.cookies?.refreshToken;

//       if (!refreshToken) {
//         res.status(401).json({ message: "Unauthorized: No access or refresh token provided" });
//         return 
//       }

//       try {
//         // Generate a new access token using the refresh token
//         const newAccessToken = await AuthService.refreshAccessToken(refreshToken);

//         // Update the access token cookie
//         res.cookie("accessToken", newAccessToken, {
//           httpOnly: true,
//           secure: process.env.NODE_ENV === "production",
//           sameSite: "strict",
//           maxAge: 5 * 60 * 1000, // Access token expiration (5 minutes)
//         });

//         // Verify the new access token and attach user info to request object
//         const decoded = AuthService.verifyToken(newAccessToken);
//         req.user = decoded;

//         next(); // Proceed to route handler
//       } catch (refreshErr) {
//         console.error("Refresh token invalid or expired:", refreshErr instanceof Error ? refreshErr.message : refreshErr);
//         res.status(401).json({ message: "Unauthorized: Refresh token invalid or expired" });
//         return
//       }

//       return; // Stop further execution after handling refresh logic
//     }

//     // Check if the access token is blacklisted
//     const isBlacklisted = await AuthService.isTokenBlacklisted(accessToken);
//     if (isBlacklisted) {
//       res.status(403).json({ message: "Access token has been invalidated" });
//       return 
//     }

//     try {
//       // Verify the access token
//       const decoded = AuthService.verifyToken(accessToken);
//       req.user = decoded; // Attach decoded user information to request object
//       next(); // Proceed to route handler
//     } catch (accessErr) {
//       if (accessErr instanceof Error) {
//         console.error("Access token invalid or expired:", accessErr.message);

//         const refreshToken = req.cookies?.refreshToken;

//         if (!refreshToken) {
//           res.status(401).json({ message: "Unauthorized: No refresh token provided" });
//           return 
//         }

//         try {
//           const newAccessToken = await AuthService.refreshAccessToken(refreshToken);

//           // Update the access token cookie
//           res.cookie("accessToken", newAccessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "strict",
//             maxAge: 5 * 60 * 1000,
//           });

//           const decoded = AuthService.verifyToken(newAccessToken);
//           req.user = decoded;

//           next();
//         } catch (refreshErr) {
//           console.error("Refresh token invalid or expired:", refreshErr instanceof Error ? refreshErr.message : refreshErr);
//           res.status(401).json({ message: "Unauthorized" });
//           return 
//         }
//       } else {
//         console.error("Unknown error verifying access token:", accessErr);
//         res.status(500).json({ message: "Internal server error" });
//         return 
//       }
//     }
//   } catch (err) {
//     console.error("Error verifying JWT:", err instanceof Error ? err.message : err);
//     res.status(500).json({ message: "Internal server error" });
//     return 
//   }
// };

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
