import DigitalTimer from "@/components/ui/DigitalTimer";
import FocusStatsChart from "@/components/ui/FocusStatChart";
import PomodoroAvatars from "@/components/ui/SessionAvatar";
import TaskList from "@/components/ui/TaskList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* Left Side - Timer and Tasks */}
          <div className="lg:col-span-4 space-y-6">
            {/* Digital Timer Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <DigitalTimer />
            </div>
            
            {/* Task List Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              <TaskList />
            </div>
            <div className="bg-white rounded-lg shadow-sm border">
              <PomodoroAvatars/>
            </div>
          </div>
          
          {/* Right Side - Stats Chart */}
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