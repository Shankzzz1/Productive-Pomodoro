import  { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function PomodoroTimer() {
  const [time, setTime] = useState(1500); // 25 minutes default
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro'); // pomodoro, shortBreak, longBreak
  const intervalRef = useRef<NodeJS.Timeout | null>(null);;

  const modes = {
    pomodoro: { time: 1500, label: 'Pomodoro', color: 'text-red-400' }, // 25 min
    shortBreak: { time: 300, label: 'Short Break', color: 'text-green-400' }, // 5 min
    longBreak: { time: 900, label: 'Long Break', color: 'text-cyan-400' } // 15 min
  };


useEffect(() => {
  if (isRunning && time > 0) {
    intervalRef.current = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  } else {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
}, [isRunning, time]);


  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(modes[mode].time);
  };

  const handleModeChange = (newMode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
  setIsRunning(false);
  setMode(newMode);
  setTime(modes[newMode].time);
};

  const getProgress = () => {
    const totalTime = modes[mode].time;
    return ((totalTime - time) / totalTime) * 100;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-500/10 to-blue-500/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-500/5 to-yellow-500/5 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Moving gradient waves */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-r from-indigo-400/8 to-transparent rounded-full animate-pulse" style={{animationDuration: '6s'}}></div>
          <div className="absolute top-3/4 -right-20 w-32 h-32 bg-gradient-to-l from-rose-400/8 to-transparent rounded-full animate-pulse" style={{animationDelay: '3s', animationDuration: '8s'}}></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-blue-400/20 rotate-45 animate-spin" style={{animationDuration: '15s'}}></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-green-400/20 rotate-45 animate-spin" style={{animationDelay: '5s', animationDuration: '20s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-8 bg-purple-400/15 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Subtle moving lines */}
        <div className="absolute top-0 left-1/3 w-px h-20 bg-gradient-to-b from-transparent via-gray-400/15 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 right-1/3 w-px h-16 bg-gradient-to-t from-transparent via-gray-400/15 to-transparent animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Enhanced floating particles */}
      <div className="absolute inset-0">
        {/* Original bouncing particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gray-400/30 rounded-full animate-bounce"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          ></div>
        ))}
        
        {/* Additional floating elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`float-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 15}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          ></div>
        ))}
        
        {/* Slow moving larger elements */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`slow-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-br from-indigo-400/12 to-pink-400/12 rounded-full animate-pulse"
            style={{
              left: `${15 + i * 20}%`,
              top: `${40 + (i % 2) * 30}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: '8s'
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Mode Selector */}
        <div className="mb-12 flex gap-1 bg-gray-800/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-700/50">
          {Object.entries(modes).map(([key, modeData]) => (
            <button
              key={key}
              onClick={() => handleModeChange(key as 'pomodoro' | 'shortBreak' | 'longBreak')}
              disabled={isRunning}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                mode === key
                  ? 'bg-gray-700 text-white shadow-md'
                  : 'text-gray-400 hover:text-gray-200 disabled:opacity-50'
              }`}
            >
              {modeData.label}
            </button>
          ))}
        </div>

        {/* Timer Circle */}
        <div className="relative mb-12">
          <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className={modes[mode].color}
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - getProgress() / 100)}`}
              style={{
                transition: 'stroke-dashoffset 1s ease-in-out'
              }}
            />
          </svg>
          
          {/* Timer Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-light text-white font-mono tracking-wider mb-2">
              {formatTime(time)}
            </div>
            <div className={`text-lg font-medium ${modes[mode].color}`}>
              {modes[mode].label}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-6">
          <Button
            onClick={handleReset}
            variant="ghost"
            size="lg"
            className="w-14 h-14 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
          >
            <RotateCcw className="w-6 h-6" />
          </Button>

          <Button
            onClick={isRunning ? handlePause : handleStart}
            disabled={time === 0}
            size="lg"
            className="w-20 h-20 rounded-full bg-gray-800 text-white shadow-lg hover:shadow-xl hover:scale-105 hover:bg-gray-700 transition-all duration-200 disabled:opacity-50 border border-gray-600"
          >
            {isRunning ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>

          <Button
            onClick={() => handleModeChange(mode === 'pomodoro' ? 'shortBreak' : 'pomodoro')}
            variant="ghost"
            size="lg"
            disabled={isRunning}
            className="w-14 h-14 rounded-full text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 disabled:opacity-30"
          >
            <div className="w-6 h-6 rounded-full border-2 border-current"></div>
          </Button>
        </div>

        {/* Status Text */}
        <div className="mt-8 text-center">
          {time === 0 ? (
            <p className="text-2xl font-light text-gray-300 animate-pulse">
              Time's up! ✨
            </p>
          ) : isRunning ? (
            <p className="text-lg text-gray-400">
              Focus time...
            </p>
          ) : (
            <p className="text-lg text-gray-400">
              Ready to start?
            </p>
          )}
        </div>
      </div>
    </div>
  );
}