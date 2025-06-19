// src/app.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import routes from './routes/authroutes';
import { validateEnv } from './middleware/validateEnv';
import roomRoutes from './routes/roomroutes'; 

const app = express();

// First validate environment variables before any other middleware
validateEnv(app); // Pass the app instance

// Then add other middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', routes);
app.use('/api', roomRoutes);

export default app;