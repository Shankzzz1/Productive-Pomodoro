// src/middleware/validateEnv.ts
import { Request, Response, NextFunction } from 'express';
export const validateEnv = (req: Request, res: Response, next: NextFunction) => {
  const requiredVars = ['JWT_SECRET', 'MONGO_URI'];
  const missing = requiredVars.filter(v => !process.env[v]);
  
  if (missing.length) {
    console.error('Missing environment variables:', missing);
    return res.status(500).json({
      message: 'Server configuration incomplete',
      missingVariables: missing
    });
  }
  next();
};

