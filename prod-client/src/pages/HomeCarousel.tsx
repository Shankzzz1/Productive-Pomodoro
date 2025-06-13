import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Home from './Home';
import PomodoroTimer from '../components/ui/PageTimer';
import { useTimer } from '../hooks/usetimer';

const HomeCarousel = () => {
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  
  const modes = {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900
  };

  const { time, isRunning, start, pause, reset, setTime } = useTimer(modes[mode]);

  const handleModeChange = (newMode: 'pomodoro' | 'shortBreak' | 'longBreak') => {
    pause();
    setMode(newMode);
    setTime(modes[newMode]);
  };

  const handleAdjustTime = (delta: number) => {
    if (!isRunning) {
      const newTime = Math.max(0, Math.min(5999, time + delta));
      setTime(newTime);
    }
  };

  return (
    <div className="h-screen">
      <Swiper spaceBetween={50} slidesPerView={1} className="h-full">
        <SwiperSlide>
          <div className="h-full overflow-hidden">
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
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-full overflow-y-auto">
            <Home 
              time={time}
              isRunning={isRunning}
              onStart={start}
              onPause={pause}
              onReset={() => reset(modes[mode])}
              onAdjustTime={handleAdjustTime}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeCarousel;