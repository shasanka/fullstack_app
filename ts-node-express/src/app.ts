import express from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorHandler';
import rootRouter  from './routes/rootRouter';
import cors from 'cors'
// import itemRoutes from './routes/itemRoutes';

const app = express();

// CORS configuration
app.use(
    cors({
      origin: 'http://localhost:5173', // Your Vite React frontend URL
      credentials: true, // Allow cookies/credentials to be sent (needed for session-based auth)
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    })
  );
app.use(express.json());
app.use(cookieParser());
// Routes
app.use('/api/v1', rootRouter);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;