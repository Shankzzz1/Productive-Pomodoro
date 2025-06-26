import { Request, Response } from 'express';
import { Room } from '../model/Room';
import User from '../model/User';
import { createRoomSchema } from '../validators/roomvalidator';

export const createRoom = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { error } = createRoomSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const room = new Room({
      name: req.body.name,
      visibility: req.body.visibility,
      password: req.body.visibility === 'private' ? req.body.password : undefined,
      owner: req.user._id,
      roomCode: generateRoomCode(),
      pomodoroDuration: req.body.pomodoroDuration,
      shortBreakDuration: req.body.shortBreakDuration,
      longBreakDuration: req.body.longBreakDuration,
      members: [req.user._id]
    });

    await room.save();

    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { rooms: room._id }
    });

    return res.status(201).json({
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
          id: req.user._id,
          name: req.user.name,
          email: req.user.email
        },
        createdAt: room.createdAt
      }
    });

  } catch (error) {
    console.error('Error creating room:', error);
    return res.status(500).json({ message: 'Server error while creating room' });
  }
};

function isMongoError(error: any): error is { code: number; keyPattern: Record<string, unknown> } {
  return typeof error === 'object' && error !== null && 'code' in error && 'keyPattern' in error;
}

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}