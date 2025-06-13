import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';

interface AnimatedDigitProps {
  digit: string;
  index: number;
}

const AnimatedDigit: React.FC<AnimatedDigitProps> = ({ digit, index }) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (currentDigit !== digit) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setCurrentDigit(digit);
        setIsAnimating(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [digit, currentDigit]);

  return (
    <div className="relative inline-block w-8 h-12 overflow-hidden">
      <div
        className={`absolute inset-0 flex items-center justify-center text-2xl font-mono font-bold transition-all duration-300 ${
          isAnimating ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
        }`}
        style={{ transitionDelay: `${index * 50}ms` }}
      >
        {currentDigit}
      </div>
      {isAnimating && (
        <div
          className="absolute inset-0 flex items-center justify-center text-2xl font-mono font-bold transform translate-y-full animate-in slide-in-from-bottom duration-300"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {digit}
        </div>
      )}
    </div>
  );
};

const DigitalTimer: React.FC = () => {
  const [totalSeconds, setTotalSeconds] = useState(300); // 5 minutes default
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDigits = (timeString: string): string[] => {
    return timeString.split('').map(char => char === ':' ? ':' : char);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
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
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  };

  const adjustTime = (delta: number) => {
    if (!isRunning) {
      const newTime = Math.max(0, Math.min(5999, totalSeconds + delta)); // Max 99:59
      setTotalSeconds(newTime);
      setTimeLeft(newTime);
    }
  };

  const timeString = formatTime(timeLeft);
  const digits = getDigits(timeString);
  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  return (
    <div className="w-full">
      <div className="text-center space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Focus Timer</h2>
        
        {/* Timer Display */}
        <div className="bg-black text-green-400 rounded-lg p-4 shadow-inner">
          <div className="flex items-center justify-center space-x-1">
            {digits.map((digit, index) => (
              digit === ':' ? (
                <div key={index} className="text-2xl font-mono font-bold px-1 animate-pulse">:</div>
              ) : (
                <AnimatedDigit key={index} digit={digit} index={index} />
              )
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time Adjustment - More Compact */}
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => adjustTime(-60)}
            disabled={isRunning}
            className="hover:bg-red-50 text-xs px-2 py-1"
          >
            <Minus className="w-3 h-3 mr-1" />
            1m
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => adjustTime(-10)}
            disabled={isRunning}
            className="hover:bg-red-50 text-xs px-2 py-1"
          >
            <Minus className="w-3 h-3 mr-1" />
            10s
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => adjustTime(10)}
            disabled={isRunning}
            className="hover:bg-green-50 text-xs px-2 py-1"
          >
            <Plus className="w-3 h-3 mr-1" />
            10s
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => adjustTime(60)}
            disabled={isRunning}
            className="hover:bg-green-50 text-xs px-2 py-1"
          >
            <Plus className="w-3 h-3 mr-1" />
            1m
          </Button>
        </div>

        {/* Control Buttons - More Compact */}
        <div className="flex justify-center space-x-3">
          <Button
            onClick={handleStart}
            size="sm"
            className={`px-4 py-2 font-medium transition-all duration-200 ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Start
              </>
            )}
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="px-4 py-2 font-medium hover:bg-gray-50"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>

        {/* Status */}
        <div className="text-sm text-gray-500 min-h-[20px]">
          {timeLeft === 0 ? (
            <span className="text-red-500 font-semibold animate-pulse">Time's Up!</span>
          ) : isRunning ? (
            <span className="text-green-500">Timer Running...</span>
          ) : (
            <span>Timer Paused</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalTimer;