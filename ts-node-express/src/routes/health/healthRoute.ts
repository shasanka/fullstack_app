import express,{  Router } from "express";

const healthRoute :Router = express.Router();

healthRoute.get("/", (req, res) => {
    res.status(200).json({ message: "OK" });
})

export default healthRoute;