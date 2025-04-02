import express, { Router } from 'express'
import healthRoute from './health/healthRoute';
import dashboardRoute from './dashboardRoute/dahsboardRoute';
import authRouter from './auth/authRouter';
import verifyJWT from '@/middlewares/verifyJWT';



const rootRouter:Router = express.Router();

rootRouter.use('/health', healthRoute)
rootRouter.use('/auth', authRouter)
rootRouter.use('/dashboard',verifyJWT,dashboardRoute);

export default rootRouter;