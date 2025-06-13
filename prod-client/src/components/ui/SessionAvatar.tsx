import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Plus, Minus, Settings } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  status: 'active' | 'break' | 'idle';
  joinedAt: Date;
}

interface PomodoroAvatarsProps {
  participants?: Participant[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
  showCount?: boolean;
  layout?: 'horizontal' | 'grid' | 'vertical';
  onParticipantClick?: (participant: Participant) => void;
}

const PomodoroAvatars: React.FC<PomodoroAvatarsProps> = ({
  participants = [],
  maxVisible = 6,
  size = 'md',
  showStatus = true,
  showCount = true,
  layout = 'horizontal',
  onParticipantClick
}) => {
  const [currentMaxVisible, setCurrentMaxVisible] = useState(maxVisible);
  
  // Sample data if no participants provided
  const defaultParticipants: Participant[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      joinedAt: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
    },
    {
      id: '2',
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'break',
      joinedAt: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: '3',
      name: 'Carol Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      joinedAt: new Date(Date.now() - 1000 * 60 * 45) // 45 minutes ago
    },
    {
      id: '4',
      name: 'David Wilson',
      status: 'idle',
      joinedAt: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
    },
    {
      id: '5',
      name: 'Eva Martinez',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      joinedAt: new Date(Date.now() - 1000 * 60 * 20) // 20 minutes ago
    },
    {
      id: '6',
      name: 'Frank Brown',
      status: 'break',
      joinedAt: new Date(Date.now() - 1000 * 60 * 10) // 10 minutes ago
    },
    {
      id: '7',
      name: 'Grace Lee',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      status: 'active',
      joinedAt: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
    }
  ];

  const activeParticipants = participants.length > 0 ? participants : defaultParticipants;
  const visibleParticipants = activeParticipants.slice(0, currentMaxVisible);
  const remainingCount = Math.max(0, activeParticipants.length - currentMaxVisible);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-8 w-8';
      case 'lg':
        return 'h-12 w-12';
      default:
        return 'h-10 w-10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'break':
        return 'bg-yellow-500';
      case 'idle':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-3 gap-2';
      case 'vertical':
        return 'flex flex-col space-y-2';
      default:
        return 'flex flex-wrap items-center gap-2';
    }
  };

  const formatJoinTime = (joinedAt: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - joinedAt.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just joined';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}h ago`;
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Pomodoro Session
          </CardTitle>
          {showCount && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              {activeParticipants.length} participants
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className={getLayoutClasses()}>
          {visibleParticipants.map((participant) => (
            <div
              key={participant.id}
              className="relative group cursor-pointer"
              onClick={() => onParticipantClick?.(participant)}
            >
              <Avatar className={`${getSizeClasses()} transition-transform hover:scale-105 ring-2 ring-background`}>
                <AvatarImage
                  src={participant.avatar}
                  alt={participant.name}
                />
                <AvatarFallback className="text-xs font-medium">
                  {getInitials(participant.name)}
                </AvatarFallback>
              </Avatar>
              
              {showStatus && (
                <div
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(participant.status)}`}
                  title={`Status: ${participant.status}`}
                />
              )}
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                <div className="font-medium">{participant.name}</div>
                <div className="text-xs opacity-75">{formatJoinTime(participant.joinedAt)}</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
              </div>
            </div>
          ))}
          
          {remainingCount > 0 && (
            <div className="relative">
              <Avatar className={`${getSizeClasses()} bg-muted cursor-pointer hover:bg-muted/80 transition-colors`}>
                <AvatarFallback className="text-xs font-medium text-muted-foreground">
                  +{remainingCount}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentMaxVisible(Math.max(3, currentMaxVisible - 3))}
              disabled={currentMaxVisible <= 3}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Showing {Math.min(currentMaxVisible, activeParticipants.length)} of {activeParticipants.length}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentMaxVisible(Math.min(activeParticipants.length, currentMaxVisible + 3))}
              disabled={currentMaxVisible >= activeParticipants.length}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Status Legend */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Active</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <span>Break</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
            <span>Idle</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroAvatars;