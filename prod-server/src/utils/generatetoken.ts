// src/utils/generateToken.ts
import jwt from 'jsonwebtoken';

// Fallback secret for development (remove in production)
const FALLBACK_SECRET = 'development-only-secret-change-this-in-production';

const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || FALLBACK_SECRET;
  
  if (!secret || secret === FALLBACK_SECRET) {
    console.warn('⚠️ Using fallback JWT secret - this is insecure for production!');
  }

  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};

export default generateToken;