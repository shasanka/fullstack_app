import AuthService from "@/services/AuthService";
import { Request, Response } from "express";

// In your auth controller/router
const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    // console.log("🚀 ~ refreshToken received:", refreshToken);

    if (!refreshToken) {
      res.status(401).json({ message: "No refresh token provided" });
      return;
    }

    const newAccessToken = await AuthService.refreshAccessToken(refreshToken);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 60 * 1000,
    });

    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (err) {
    console.error("Error refreshing token:", err instanceof Error ? err.message : err);
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

  export default refreshToken