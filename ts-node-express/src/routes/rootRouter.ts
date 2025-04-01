import express, { Router } from 'express'
import healthRoute from './health/healthRoute';
import dashboardRoute from './dashboardRoute/dahsboardRoute';
import authRouter from './auth/authRouter';



const rootRouter:Router = express.Router();

rootRouter.use('/health', healthRoute)
rootRouter.use('/auth', authRouter)
rootRouter.use('/dashboard',dashboardRoute);

export default rootRouter;