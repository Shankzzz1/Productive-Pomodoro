import DigitalTimer, { type DigitalTimerProps } from "@/components/ui/DigitalTimer";
import FocusStatsChart from "@/components/ui/FocusStatChart";
import PomodoroAvatars from "@/components/ui/SessionAvatar";
import TaskList from "@/components/ui/TaskList";

export default function Home({
  time,
  isRunning,
  onStart,
  onPause,
  onReset,
  onAdjustTime
}: DigitalTimerProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <DigitalTimer 
                time={time}
                isRunning={isRunning}
                onStart={onStart}
                onPause={onPause}
                onReset={onReset}
                onAdjustTime={onAdjustTime}
              />
            </div>
            <div className="bg-white rounded-lg shadow-sm border">
              <TaskList />
            </div>
            <div className="bg-white rounded-lg shadow-sm border">
              <PomodoroAvatars/>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border p-6 h-full">
              <FocusStatsChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}