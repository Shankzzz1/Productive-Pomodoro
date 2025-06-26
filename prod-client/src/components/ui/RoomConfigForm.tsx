import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Clock, Users, Timer, Coffee, RotateCcw, Lock } from 'lucide-react';
import { useAuth } from '@/context/authcontext';
import { toast } from 'sonner';
import api from '@/api/axios'

interface FormData {
  name: string;
  visibility: 'public' | 'private';
  password?: string;
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

const RoomConfigForm: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    visibility: 'public',
    password: '',
    pomodoroDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Room name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Room name must be at least 3 characters';
    }

    if (formData.visibility === 'private') {
      if (!formData.password?.trim()) {
        newErrors.password = 'Password is required for private rooms';
      } else if (formData.password.length < 4) {
        newErrors.password = 'Password must be at least 4 characters';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const submitData = { ...formData };
      // Remove password field if room is public
      if (formData.visibility === 'public') {
        delete submitData.password;
      }

      const response = await api.post('/rooms', submitData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      toast.success('Room created successfully!', {
        description: `Your room code is ${response.data.room.roomCode}`,
      });

      navigate(`/pomodoro/${response.data.room.id}`);

    } catch (error) {
      console.error('Error creating room:', error);
      
      toast.error('Failed to create room', {
        description: error.response?.data?.message || 'Please try again later',
      });

    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleVisibilityChange = (value: 'public' | 'private') => {
    setFormData(prev => ({ 
      ...prev, 
      visibility: value,
      // Clear password when switching to public
      password: value === 'public' ? '' : prev.password
    }));
    // Clear password error when switching to public
    if (value === 'public' && errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const formatTime = (minutes: number): string => {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Create Study Room</h1>
        <p className="text-gray-600">Configure your Pomodoro study session</p>
      </div>

      <div className="space-y-6">
        {/* Room Name */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-blue-600" />
              Room Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roomName" className="text-sm font-medium">
                Room Name
              </Label>
              <Input
                id="roomName"
                type="text"
                placeholder="Enter room name (e.g., Study Group Alpha)"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Visibility Settings */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-green-600" />
              Room Visibility
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={formData.visibility}
              onValueChange={handleVisibilityChange}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="public" id="public" />
                <div className="flex-1">
                  <Label htmlFor="public" className="font-medium cursor-pointer">
                    Public Room
                  </Label>
                  <p className="text-sm text-gray-600">
                    Anyone can discover and join this room
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="private" id="private" />
                <div className="flex-1">
                  <Label htmlFor="private" className="font-medium cursor-pointer">
                    Private Room
                  </Label>
                  <p className="text-sm text-gray-600">
                    Only users with the password can join this room
                  </p>
                </div>
              </div>
            </RadioGroup>

            {/* Password field for private rooms */}
            {formData.visibility === 'private' && (
              <div className="space-y-2 mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-orange-400">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="h-4 w-4 text-orange-600" />
                  Room Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a secure password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
                <p className="text-xs text-gray-600">
                  Users will need this password to join your private room
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timer Settings */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-purple-600" />
              Pomodoro Timer Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Pomodoro Duration */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 font-medium">
                  <Timer className="h-4 w-4 text-red-500" />
                  Focus Session Duration
                </Label>
                <span className="text-sm font-medium bg-red-100 text-red-700 px-2 py-1 rounded">
                  {formatTime(formData.pomodoroDuration)}
                </span>
              </div>
              <Slider
                value={[formData.pomodoroDuration]}
                onValueChange={([value]) => handleInputChange('pomodoroDuration', value)}
                min={15}
                max={60}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>15 min</span>
                <span>60 min</span>
              </div>
            </div>

            {/* Short Break Duration */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 font-medium">
                  <Coffee className="h-4 w-4 text-orange-500" />
                  Short Break Duration
                </Label>
                <span className="text-sm font-medium bg-orange-100 text-orange-700 px-2 py-1 rounded">
                  {formatTime(formData.shortBreakDuration)}
                </span>
              </div>
              <Slider
                value={[formData.shortBreakDuration]}
                onValueChange={([value]) => handleInputChange('shortBreakDuration', value)}
                min={3}
                max={15}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>3 min</span>
                <span>15 min</span>
              </div>
            </div>

            {/* Long Break Duration */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 font-medium">
                  <RotateCcw className="h-4 w-4 text-blue-500" />
                  Long Break Duration
                </Label>
                <span className="text-sm font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {formatTime(formData.longBreakDuration)}
                </span>
              </div>
              <Slider
                value={[formData.longBreakDuration]}
                onValueChange={([value]) => handleInputChange('longBreakDuration', value)}
                min={10}
                max={30}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10 min</span>
                <span>30 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              'Create Room'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="px-6 py-3"
            onClick={() => {
              setFormData({
                name: '',
                visibility: 'public',
                password: '',
                pomodoroDuration: 25,
                shortBreakDuration: 5,
                longBreakDuration: 15
              });
              setErrors({});
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Configuration Preview */}
      <Card className="bg-gray-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Configuration Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Room:</span>
            <span className="font-medium">{formData.name || 'Not set'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Visibility:</span>
            <span className="font-medium capitalize">{formData.visibility}</span>
          </div>
          {formData.visibility === 'private' && (
            <div className="flex justify-between">
              <span className="text-gray-600">Password:</span>
              <span className="font-medium">
                {formData.password ? '••••••••' : 'Not set'}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Focus Session:</span>
            <span className="font-medium">{formatTime(formData.pomodoroDuration)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Short Break:</span>
            <span className="font-medium">{formatTime(formData.shortBreakDuration)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Long Break:</span>
            <span className="font-medium">{formatTime(formData.longBreakDuration)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomConfigForm;