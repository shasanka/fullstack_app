import { Request, Response } from "express";

class DashboardController {
    async getDashboard(req: Request, res: Response): Promise<void> {
        try {
            // Access user information from req.user (added by verifyJWT middleware)
            const user = req.user;

            res.status(200).json({
                message: `Welcome to your dashboard, ${user?.email}!`,
                user,
            });
        } catch (err) {
            console.error("Error fetching dashboard:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new DashboardController();
