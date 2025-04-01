import app from './app';
import config from './config/config';
import {run } from './middlewares/lib/database';
// Start MongoDB connection
run()
  .then(() => {
    // Start the server only after MongoDB connection is successful
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });