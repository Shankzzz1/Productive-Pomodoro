import { Request, Response } from 'express';
import { Room } from '../model/Room';
import  User  from '../model/User';
import { createRoomSchema } from '../validators/roomvalidator';
import { AuthenticatedRequest } from '../middleware/auth';

export const createRoom = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Validate request body
    const { error } = createRoomSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return; // Explicit return to stop execution
    }

    // Get authenticated user from request
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    // Create new room
    const room = new Room({
      name: req.body.name,
      visibility: req.body.visibility,
      owner: userId,
      roomCode: generateRoomCode(),
      pomodoroDuration: req.body.pomodoroDuration,
      shortBreakDuration: req.body.shortBreakDuration,
      longBreakDuration: req.body.longBreakDuration,
      members: [userId]
    });

    await room.save();

    // Add room to user's rooms
    await User.findByIdAndUpdate(userId, {
      $addToSet: { rooms: room._id }
    });

    // Send response without returning it
    res.status(201).json({
      message: 'Room created successfully',
      room: {
        id: room._id,
        name: room.name,
        roomCode: room.roomCode,
        visibility: room.visibility,
        pomodoroDuration: room.pomodoroDuration,
        shortBreakDuration: room.shortBreakDuration,
        longBreakDuration: room.longBreakDuration,
        owner: {
          id: req.user?._id,
          name: req.user?.name,
          email: req.user?.email
        },
        createdAt: room.createdAt
      }
    });

  } catch (error) {
  console.error('Error creating room:', error);
  
  // Type guard for MongoDB duplicate key error
  if (isMongoError(error) && error.code === 11000 && error.keyPattern?.roomCode) {
    res.status(409).json({ message: 'Room code already exists. Please try again.' });
    return;
  }

  res.status(500).json({ message: 'Server error while creating room' });
}

// Helper type guard
function isMongoError(error: unknown): error is { code: number; keyPattern: Record<string, unknown> } {
  return typeof error === 'object' && error !== null && 'code' in error && 'keyPattern' in error;
}
};

// Helper function to generate room code
function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}