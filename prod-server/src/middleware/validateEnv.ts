// src/middleware/validateEnv.ts
import { Application } from 'express';

export const validateEnv = (app: Application) => {
  const requiredVars = ['JWT_SECRET', 'MONGO_URI'];
  const missing = requiredVars.filter(v => !process.env[v]);
  
  if (missing.length) {
    console.error('Missing environment variables:', missing);
    throw new Error(`Server configuration incomplete. Missing: ${missing.join(', ')}`);
  }
  
  // Optional: Add a health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', env: 'valid' });
  });
};