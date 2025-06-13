import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, Plus, Trash2, Edit3, Check, X } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onToggle(task.id);
      setIsAnimating(false);
    }, 150);
  };

  const handleEdit = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div 
      className={`group flex items-center space-x-3 p-4 rounded-lg border transition-all duration-300 ${
        task.completed 
          ? 'bg-green-50 border-green-200 opacity-75' 
          : 'bg-white border-gray-200 hover:border-gray-300'
      } ${isAnimating ? 'transform scale-105' : ''}`}
    >
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className={`flex-shrink-0 transition-all duration-200 hover:scale-110 ${
          task.completed ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
        }`}
      >
        {task.completed ? (
          <CheckCircle2 className="w-6 h-6" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>

      {/* Task Text */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-3 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button
              size="sm"
              onClick={handleEdit}
              className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600"
            >
              <Check className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              className="h-8 w-8 p-0 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <span
            className={`block text-sm transition-all duration-300 ${
              task.completed
                ? 'line-through text-gray-500'
                : 'text-gray-900'
            }`}
          >
            {task.text}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      {!isEditing && (
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(task.id)}
            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      text: 'Complete project documentation',
      completed: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      text: 'Review code changes',
      completed: true,
      createdAt: new Date(Date.now() - 3600000),
    },
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        createdAt: new Date(),
      };
      setTasks(prev => [newTask, ...prev]);
      setNewTaskText('');
      setIsAdding(false);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id: string, newText: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    } else if (e.key === 'Escape') {
      setNewTaskText('');
      setIsAdding(false);
    }
  };

  const startAdding = () => {
    setIsAdding(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <span className="text-xl font-bold">Task List</span>
            <div className="text-sm text-gray-500">
              {completedCount}/{totalCount} completed
            </div>
          </CardTitle>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-green-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Add New Task */}
          <div className="space-y-3">
            {isAdding ? (
              <div className="flex items-center space-x-2 p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 animate-in slide-in-from-top duration-300">
                <input
                  ref={inputRef}
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter a new task..."
                  className="flex-1 px-3 py-2 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
                <Button
                  onClick={addTask}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600"
                  disabled={!newTaskText.trim()}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => {
                    setIsAdding(false);
                    setNewTaskText('');
                  }}
                  size="sm"
                  variant="outline"
                  className="hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={startAdding}
                variant="outline"
                className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Task
              </Button>
            )}
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Circle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No tasks yet. Add one to get started!</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="animate-in slide-in-from-right duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TaskItem
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                  />
                </div>
              ))
            )}
          </div>

          {/* Statistics */}
          {tasks.length > 0 && (
            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{tasks.filter(t => !t.completed).length} remaining</span>
                <span>{completedCount} completed</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskList;