interface Room {
  name: string;
  members: string[];
  currentTimer: { type: 'focus' | 'break'; startTime: Date; duration: number };
}