import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Users, Clock, Coffee, Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  type: 'message' | 'system' | 'status';
  avatar?: string;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'focusing' | 'break' | 'offline';
  timeRemaining?: number;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Sarah started a 25-minute focus session',
      sender: 'System',
      timestamp: new Date(Date.now() - 1800000),
      type: 'system'
    },
    {
      id: '2',
      text: 'Ready to tackle this project! 💪',
      sender: 'Sarah',
      timestamp: new Date(Date.now() - 1740000),
      type: 'message',
      avatar: '👩‍💻'
    },
    {
      id: '3',
      text: 'Mike joined the session',
      sender: 'System',
      timestamp: new Date(Date.now() - 1680000),
      type: 'system'
    },
    {
      id: '4',
      text: 'Let\'s crush this session together!',
      sender: 'Mike',
      timestamp: new Date(Date.now() - 1620000),
      type: 'message',
      avatar: '👨‍🎨'
    },
    {
      id: '5',
      text: 'Focus session completed! Great work everyone 🎉',
      sender: 'System',
      timestamp: new Date(Date.now() - 300000),
      type: 'system'
    },
    {
      id: '6',
      text: 'That was productive! Break time ☕',
      sender: 'Sarah',
      timestamp: new Date(Date.now() - 240000),
      type: 'message',
      avatar: '👩‍💻'
    }
  ]);

  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Sarah',
      avatar: '👩‍💻',
      status: 'break',
      timeRemaining: 300
    },
    {
      id: '2',
      name: 'Mike',
      avatar: '👨‍🎨',
      status: 'focusing',
      timeRemaining: 1200
    },
    {
      id: '3',
      name: 'Alex',
      avatar: '👨‍💼',
      status: 'focusing',
      timeRemaining: 800
    },
    {
      id: '4',
      name: 'Emma',
      avatar: '👩‍🔬',
      status: 'offline'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'You',
        timestamp: new Date(),
        type: 'message',
        avatar: '🧑‍💻'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatTimeRemaining = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'focusing': return <Zap className="w-3 h-3 text-red-500" />;
      case 'break': return <Coffee className="w-3 h-3 text-green-500" />;
      case 'offline': return <div className="w-3 h-3 rounded-full bg-gray-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'focusing': return 'text-red-500 bg-red-50';
      case 'break': return 'text-green-500 bg-green-50';
      case 'offline': return 'text-gray-500 bg-gray-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const focusingUsers = users.filter(user => user.status === 'focusing').length;
  const onBreakUsers = users.filter(user => user.status === 'break').length;

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Focus Group
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-red-600 border-red-200">
                <Zap className="w-3 h-3 mr-1" />
                {focusingUsers} focusing
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Coffee className="w-3 h-3 mr-1" />
                {onBreakUsers} on break
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Active Users */}
      <Card className="mb-4">
        <CardContent className="p-3">
          <div className="flex flex-wrap gap-2">
            {users.map((user) => (
              <div
                key={user.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-full border ${getStatusColor(user.status)}`}
              >
                <span className="text-sm">{user.avatar}</span>
                <span className="text-sm font-medium">{user.name}</span>
                {getStatusIcon(user.status)}
                {user.timeRemaining && user.status !== 'offline' && (
                  <span className="text-xs">
                    {formatTimeRemaining(user.timeRemaining)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === 'system' ? (
                <div className="flex justify-center">
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {message.text}
                  </div>
                </div>
              ) : (
                <div className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === 'You' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">
                      {message.avatar}
                    </div>
                    <div
                      className={`px-3 py-2 rounded-lg ${
                        message.sender === 'You'
                          ? 'bg-blue-500 text-white rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                      }`}
                    >
                      {message.sender !== 'You' && (
                        <p className="text-xs font-medium text-gray-600 mb-1">{message.sender}</p>
                      )}
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'You' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Encourage your team..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              size="sm"
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-2 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewMessage("Great job everyone! 💪")}
              className="text-xs"
            >
              💪 Encourage
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewMessage("Taking a quick break ☕")}
              className="text-xs"
            >
              ☕ Break
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setNewMessage("Back to focus mode! 🎯")}
              className="text-xs"
            >
              🎯 Focus
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;