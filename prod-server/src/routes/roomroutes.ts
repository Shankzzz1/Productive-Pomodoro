import express from 'express';
import { createRoom } from '../controller/roomController';
import { verifyRoomPassword } from '../controller/roomAuthController';
import { protect } from '../middleware/auth';  // This import should now work
import validate from '../middleware/validate';
import { createRoomSchema } from '../validators/roomvalidator';

const router = express.Router();

router.post(
  '/rooms',
  protect,
  validate(createRoomSchema),
  (req, res, next) => {
    createRoom(req, res).catch(next);
  }
);

router.post(
  '/rooms/verify-password',
  protect,
  (req, res, next) => {
    verifyRoomPassword(req, res).catch(next);
  }
);

export default router;