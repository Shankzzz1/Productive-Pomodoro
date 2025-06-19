import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Search, Lock, Globe, User, Key, Timer, Users } from 'lucide-react';

interface JoinFormData {
  joinMethod: 'search' | 'code';
  roomSearch: string;
  roomCode: string;
  username: string;
  password?: string;
}

interface Room {
  id: string;
  name: string;
  visibility: 'public' | 'private';
  participants: number;
  isActive: boolean;
  requiresPassword: boolean;
}

const JoinRoomForm: React.FC = () => {
  const [formData, setFormData] = useState<JoinFormData>({
    joinMethod: 'search',
    roomSearch: '',
    roomCode: '',
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState<Partial<JoinFormData>>({});
  const [searchResults, setSearchResults] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock room data for demonstration
  const mockRooms: Room[] = [
    { id: '1', name: 'Study Group Alpha', visibility: 'public', participants: 5, isActive: true, requiresPassword: false },
    { id: '2', name: 'Focus Session', visibility: 'public', participants: 3, isActive: true, requiresPassword: false },
    { id: '3', name: 'Private Study', visibility: 'private', participants: 2, isActive: true, requiresPassword: true },
    { id: '4', name: 'Team Pomodoro', visibility: 'public', participants: 8, isActive: false, requiresPassword: false }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<JoinFormData> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
    }

    if (formData.joinMethod === 'search') {
      if (!selectedRoom) {
        newErrors.roomSearch = 'Please select a room to join';
      }
    } else {
      if (!formData.roomCode.trim()) {
        newErrors.roomCode = 'Room code is required';
      } else if (formData.roomCode.length < 6) {
        newErrors.roomCode = 'Room code must be at least 6 characters';
      }
    }

    if (selectedRoom?.requiresPassword && !formData.password?.trim()) {
      newErrors.password = 'Password is required for this room';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (!formData.roomSearch.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      const results = mockRooms.filter(room =>
        room.name.toLowerCase().includes(formData.roomSearch.toLowerCase()) &&
        room.visibility === 'public'
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleJoinRoom = () => {
    if (validateForm()) {
      const roomToJoin = formData.joinMethod === 'search' ? selectedRoom : { code: formData.roomCode };
      console.log('Joining room:', roomToJoin, 'as user:', formData.username);
      alert(`Successfully joined room as ${formData.username}!`);
    }
  };

  const handleInputChange = (field: keyof JoinFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    // Clear selected room when changing search
    if (field === 'roomSearch') {
      setSelectedRoom(null);
    }
  };

  const selectRoom = (room: Room) => {
    setSelectedRoom(room);
    setErrors(prev => ({ ...prev, roomSearch: undefined }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Join Study Room</h1>
        <p className="text-gray-600">Connect with others and start your focused session</p>
      </div>

      <div className="space-y-6">
        {/* Username */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-blue-600" />
              Your Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your display name"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className={errors.username ? 'border-red-500' : ''}
              />
              {errors.username && (
                <p className="text-sm text-red-600">{errors.username}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Join Method Selection */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5 text-green-600" />
              How to Join
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={formData.joinMethod}
              onValueChange={(value: 'search' | 'code') => {
                setFormData(prev => ({ ...prev, joinMethod: value }));
                setSelectedRoom(null);
                setSearchResults([]);
              }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="search" id="search" />
                <div className="flex-1">
                  <Label htmlFor="search" className="font-medium cursor-pointer">
                    Browse Public Rooms
                  </Label>
                  <p className="text-sm text-gray-600">
                    Search and join publicly available study rooms
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="code" id="code" />
                <div className="flex-1">
                  <Label htmlFor="code" className="font-medium cursor-pointer">
                    Enter Room Code
                  </Label>
                  <p className="text-sm text-gray-600">
                    Join using a specific room code or invitation link
                  </p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Search Rooms */}
        {formData.joinMethod === 'search' && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="h-5 w-5 text-purple-600" />
                Find Rooms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search room names..."
                  value={formData.roomSearch}
                  onChange={(e) => handleInputChange('roomSearch', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className={errors.roomSearch ? 'border-red-500' : ''}
                />
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching || !formData.roomSearch.trim()}
                  className="px-6"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>
              {errors.roomSearch && (
                <p className="text-sm text-red-600">{errors.roomSearch}</p>
              )}

              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Available Rooms</Label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {searchResults.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => selectRoom(room)}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                          selectedRoom?.id === room.id ? 'border-blue-500 bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {room.visibility === 'public' ? (
                              <Globe className="h-4 w-4 text-green-500" />
                            ) : (
                              <Lock className="h-4 w-4 text-orange-500" />
                            )}
                            <span className="font-medium">{room.name}</span>
                            {room.requiresPassword && (
                              <Key className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {room.participants}
                            </div>
                            <div className="flex items-center gap-1">
                              <Timer className="h-4 w-4" />
                              {room.isActive ? (
                                <span className="text-green-600">Active</span>
                              ) : (
                                <span className="text-gray-500">Idle</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.length === 0 && formData.roomSearch && !isSearching && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No public rooms found matching "{formData.roomSearch}"
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Room Code Input */}
        {formData.joinMethod === 'code' && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Key className="h-5 w-5 text-orange-600" />
                Room Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="roomCode" className="text-sm font-medium">
                  Enter Room Code
                </Label>
                <Input
                  id="roomCode"
                  type="text"
                  placeholder="e.g., ABC123DEF"
                  value={formData.roomCode}
                  onChange={(e) => handleInputChange('roomCode', e.target.value.toUpperCase())}
                  className={errors.roomCode ? 'border-red-500' : ''}
                />
                {errors.roomCode && (
                  <p className="text-sm text-red-600">{errors.roomCode}</p>
                )}
                <p className="text-xs text-gray-500">
                  Room codes are usually 6-8 characters long
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Password Input (conditional) */}
        {selectedRoom?.requiresPassword && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="h-5 w-5 text-red-600" />
                Room Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password Required
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter room password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Join Button */}
        <div className="flex gap-3">
          <Button
            onClick={handleJoinRoom}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
          >
            Join Room
          </Button>
          <Button
            type="button"
            variant="outline"
            className="px-6 py-3"
            onClick={() => {
              setFormData({
                joinMethod: 'search',
                roomSearch: '',
                roomCode: '',
                username: '',
                password: ''
              });
              setErrors({});
              setSelectedRoom(null);
              setSearchResults([]);
            }}
          >
            Clear
          </Button>
        </div>

        {/* Selected Room Preview */}
        {selectedRoom && (
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-800">Ready to Join</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">Room:</span>
                <span className="font-medium text-green-900">{selectedRoom.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Participants:</span>
                <span className="font-medium text-green-900">{selectedRoom.participants} active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Status:</span>
                <span className="font-medium text-green-900">
                  {selectedRoom.isActive ? 'Active Session' : 'Waiting to Start'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Access:</span>
                <span className="font-medium text-green-900 capitalize">
                  {selectedRoom.visibility} {selectedRoom.requiresPassword ? '(Password Protected)' : ''}
                </span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JoinRoomForm;