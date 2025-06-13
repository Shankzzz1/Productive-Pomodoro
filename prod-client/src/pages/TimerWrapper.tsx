import { useState } from 'react';
import { useTimer } from '../hooks/usetimer';
import PomodoroTimer from '../components/ui/PageTimer';
import DigitalTimer from '../components/ui/DigitalTimer';

export default function TimerWrapper() {
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  
  const modes = {
    pomodoro: 1500, // 25 min
    shortBreak: 300, // 5 min
    longBreak: 900 // 15 min
  };

  const { time, isRunning, start, pause, reset } = useTimer(modes[mode]);

  const handleModeChange = (newMode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
    pause();
    setMode(newMode);
    reset(modes[newMode]);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      <div className="flex-1">
        <PomodoroTimer 
          time={time}
          isRunning={isRunning}
          mode={mode}
          onStart={start}
          onPause={pause}
          onReset={() => reset(modes[mode])}
          onModeChange={handleModeChange}
        />
      </div>
      <div className="flex-1">
        <DigitalTimer 
                  time={time}
                  isRunning={isRunning}
                  onStart={start}
                  onPause={pause}
                  onReset={() => reset(modes[mode])} onAdjustTime={function (delta): void {
                      throw new Error('Function not implemented.');
                  } }        />
      </div>
    </div>
  );
}