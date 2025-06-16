import { Request, Response } from 'express';
import User, { IUser } from '../model/User'; // Ensure path correctness
import generateToken from '../utils/generatetoken'; // Ensure proper casing

// Login Controller
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    
    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    } else {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Unknown server error' });
    }
  }
};

// Register Controller
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body as IUser;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id.toString());

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token || 'token-generation-failed'
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Registration error:', error.message);
      res.status(500).json({
        message: 'Registration failed',
        error: error.message
      });
    } else {
      console.error('Unknown registration error:', error);
      res.status(500).json({ message: 'Unknown registration error' });
    }
  }
};
