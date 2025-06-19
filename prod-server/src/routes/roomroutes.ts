import express from 'express';
import { createRoom } from '../controller/roomController';
import { protect } from '../middleware/auth';
import validate from '../middleware/validate';
import { createRoomSchema } from '../validators/roomvalidator';

const router = express.Router();

// POST /api/rooms - Create new room
router.post(
  '/rooms',
  protect, // Your existing auth middleware
  validate(createRoomSchema), // Your existing validate middleware
  createRoom
);

export default router;