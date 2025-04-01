import app from './app';
import config from './config/config';
import { initializeMongoDB } from './middlewares/lib/database';
import { initializeRedis } from './middlewares/lib/redisClient';
// Start MongoDB connection
async function startServer() {
  try {
    // Initialize MongoDB
    await initializeMongoDB();

    // Initialize Redis
    await initializeRedis();

    // Start the server only after both MongoDB and Redis are connected
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (err) {
    console.error('Failed to start the server:', err);
  }
}

startServer();
