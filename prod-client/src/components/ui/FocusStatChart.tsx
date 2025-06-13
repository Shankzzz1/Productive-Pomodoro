import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { type TooltipProps } from 'recharts';

const FocusStatsChart = () => {
  // Sample data - replace with your actual data
  const [timeRange, setTimeRange] = useState('week');
  
  const weeklyData = [
    { day: 'Mon', focusTime: 4.5, tasksCompleted: 8 },
    { day: 'Tue', focusTime: 6.2, tasksCompleted: 12 },
    { day: 'Wed', focusTime: 3.8, tasksCompleted: 6 },
    { day: 'Thu', focusTime: 5.5, tasksCompleted: 10 },
    { day: 'Fri', focusTime: 7.1, tasksCompleted: 15 },
    { day: 'Sat', focusTime: 2.3, tasksCompleted: 4 },
    { day: 'Sun', focusTime: 1.8, tasksCompleted: 3 }
  ];

  const monthlyData = [
    { week: 'Week 1', focusTime: 28.5, tasksCompleted: 45 },
    { week: 'Week 2', focusTime: 32.2, tasksCompleted: 52 },
    { week: 'Week 3', focusTime: 25.8, tasksCompleted: 38 },
    { week: 'Week 4', focusTime: 35.5, tasksCompleted: 58 }
  ];

  const taskCategoryData = [
    { name: 'Development', value: 45, color: '#8884d8' },
    { name: 'Design', value: 25, color: '#82ca9d' },
    { name: 'Meetings', value: 20, color: '#ffc658' },
    { name: 'Planning', value: 10, color: '#ff7c7c' }
  ];

  const currentData = timeRange === 'week' ? weeklyData : monthlyData;
  const totalFocusTime = currentData.reduce((sum, item) => sum + item.focusTime, 0);
  const totalTasks = currentData.reduce((sum, item) => sum + item.tasksCompleted, 0);
  const averageFocusTime = totalFocusTime / currentData.length;

  const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-blue-600">Focus Time: {payload[0]?.value}h</p>
        <p className="text-green-600">Tasks: {payload[1]?.value}</p>
      </div>
    );
  }
  return null;
};

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Focus Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFocusTime.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">
              {timeRange === 'week' ? 'This week' : 'This month'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {timeRange === 'week' ? 'This week' : 'This month'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Focus</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageFocusTime.toFixed(1)}h</div>
            <p className="text-xs text-muted-foreground">
              Per {timeRange === 'week' ? 'day' : 'week'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Focus Time & Task Completion</CardTitle>
              <CardDescription>
                Track your productivity over time
              </CardDescription>
            </div>
            <Tabs value={timeRange} onValueChange={setTimeRange}>
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={timeRange === 'week' ? 'day' : 'week'} 
                  fontSize={12}
                />
                <YAxis yAxisId="left" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="focusTime"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                  name="Focus Time (h)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="tasksCompleted"
                  stroke="#82ca9d"
                  strokeWidth={3}
                  dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
                  name="Tasks Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Comparison</CardTitle>
            <CardDescription>Focus time vs tasks completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="focusTime" fill="#8884d8" name="Focus Time (h)" />
                  <Bar dataKey="tasksCompleted" fill="#82ca9d" name="Tasks" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>Time spent by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {taskCategoryData.map((category, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}: {category.value}%
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FocusStatsChart;