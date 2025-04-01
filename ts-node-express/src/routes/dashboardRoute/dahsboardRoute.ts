import DashboardController from '@/controllers/DashboardController';
import verifyJWT from '@/middlewares/verifyJWT';
import express, { Router } from 'express';


const dashboardRoute :Router= express.Router();


dashboardRoute.get('/', verifyJWT, DashboardController.getDashboard);

export default dashboardRoute
