import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IRoom extends Document {
  name: string;
  visibility: 'public' | 'private';
  password?: string;
  owner: mongoose.Types.ObjectId;
  roomCode: string;
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  createdAt: Date;
  updatedAt: Date;
  members: mongoose.Types.ObjectId[];
  comparePassword?: (enteredPassword: string) => Promise<boolean>;
}

const RoomSchema = new Schema<IRoom>(
  {
    name: { 
      type: String, 
      required: [true, 'Room name is required'],
      trim: true,
      minlength: [3, 'Room name must be at least 3 characters'],
      maxlength: [50, 'Room name cannot exceed 50 characters']
    },
    visibility: { 
      type: String, 
      enum: {
        values: ['public', 'private'],
        message: 'Visibility must be either public or private'
      },
      default: 'public' 
    },
    password: { 
      type: String,
      minlength: [4, 'Password must be at least 4 characters'],
      select: false
    },
    owner: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: [true, 'Room owner is required'] 
    },
    roomCode: { 
      type: String, 
      required: true, 
      unique: true,
      uppercase: true
    },
    pomodoroDuration: { 
      type: Number, 
      required: true, 
      min: [15, 'Pomodoro duration must be at least 15 minutes'],
      max: [60, 'Pomodoro duration cannot exceed 60 minutes']
    },
    shortBreakDuration: { 
      type: Number, 
      required: true, 
      min: [3, 'Short break must be at least 3 minutes'],
      max: [15, 'Short break cannot exceed 15 minutes']
    },
    longBreakDuration: { 
      type: Number, 
      required: true, 
      min: [10, 'Long break must be at least 10 minutes'],
      max: [30, 'Long break cannot exceed 30 minutes']
    },
    members: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    }]
  },
  { 
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      }
    }
  }
);

// Hash password before saving
RoomSchema.pre('save', async function(next) {
  if (!this.isModified('password') || this.visibility !== 'private') return next();
  
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare passwords
RoomSchema.methods.comparePassword = async function(enteredPassword: string) {
  if (this.visibility !== 'private' || !this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate unique room code before saving
RoomSchema.pre('save', async function (next) {
  if (!this.isModified('roomCode') && !this.isNew) return next();
  
  let codeExists = true;
  let attempts = 0;
  const maxAttempts = 5;
  
  while (codeExists && attempts < maxAttempts) {
    this.roomCode = generateRoomCode();
    const existingRoom = await mongoose.model('Room').findOne({ roomCode: this.roomCode });
    codeExists = !!existingRoom;
    attempts++;
  }
  
  if (codeExists) {
    throw new Error('Failed to generate unique room code');
  }
  
  next();
});

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const Room = mongoose.model<IRoom>('Room', RoomSchema);