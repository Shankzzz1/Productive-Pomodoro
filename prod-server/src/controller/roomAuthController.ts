import { Request, Response } from 'express';
import { Room } from '../model/Room';

export const verifyRoomPassword = async (req: Request, res: Response) => {
  try {
    const { roomId, password } = req.body;

    if (!roomId || !password) {
      return res.status(400).json({ message: 'Room ID and password are required' });
    }

    const room = await Room.findById(roomId).select('+password');
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.visibility !== 'private') {
      return res.status(400).json({ message: 'Room is not private' });
    }

    if (!room.password) {
      return res.status(500).json({ message: 'Private room has no password set' });
    }

    const isMatch = await (room as any).comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Password verified'
    });

  } catch (error) {
    console.error('Error verifying room password:', error);
    return res.status(500).json({ message: 'Server error while verifying password' });
  }
};