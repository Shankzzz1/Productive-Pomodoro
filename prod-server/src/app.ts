// src/app.ts
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import routes from './routes/authroutes';
import { validateEnv } from './middleware/validateenv';
// import { errorHandler } from './middlewares/errormiddleware';

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Then in your app.ts:
app.use(validateEnv);

// Routes
app.use('/api', routes);

// Global error handler
// app.use(errorHandler);

export default app;
