import express from 'express';
import { loginUser, registerUser } from '../controller/authcontroller';
import validate from '../middleware/validate';
import { loginSchema, registerSchema } from '../validators/authvalidator';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/auth/register', validate(registerSchema), registerUser);
router.post('/auth/login', validate(loginSchema), loginUser);

// Add these if you want password reset functionality
// router.post('/forgot-password', forgotPassword);
// router.put('/reset-password/:resetToken', resetPassword);

// Protected route example
// router.get('/me', protect, getMe);

export default router;