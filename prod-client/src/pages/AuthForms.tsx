import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, User, Github } from 'lucide-react';

interface FormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const AuthForms: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Signup-specific validations
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Name must be at least 2 characters long';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
      });
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login clicked`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 animate-in fade-in duration-1000">
      <Card className="w-full max-w-md shadow-lg transform transition-all duration-500 hover:shadow-xl animate-in slide-in-from-bottom-4 duration-700">
        <CardHeader className="space-y-1 animate-in fade-in-50 duration-500 delay-200">
          <CardTitle className="text-2xl font-bold text-center transition-all duration-300 hover:text-blue-600">
            {isLogin ? 'Welcome back' : 'Create account'}
          </CardTitle>
          <CardDescription className="text-center transition-opacity duration-300">
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Enter your information to create your account'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 animate-in fade-in-50 duration-600 delay-300">
          {errors.general && (
            <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <div className={`space-y-2 animate-in slide-in-from-left-2 duration-400 ${isLogin ? 'animate-out slide-out-to-left-2' : ''}`}>
                <Label htmlFor="name" className="transition-colors duration-200 hover:text-blue-600">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`pl-10 transition-all duration-200 focus:scale-[1.02] hover:shadow-md ${errors.name ? 'border-red-500 animate-pulse' : 'focus:border-blue-500'}`}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500 animate-in slide-in-from-left-1 duration-200">{errors.name}</p>
                )}
              </div>
            )}

            <div className="space-y-2 animate-in slide-in-from-right-2 duration-400">
              <Label htmlFor="email" className="transition-colors duration-200 hover:text-blue-600">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 transition-all duration-200 focus:scale-[1.02] hover:shadow-md ${errors.email ? 'border-red-500 animate-pulse' : 'focus:border-blue-500'}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 animate-in slide-in-from-right-1 duration-200">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2 animate-in slide-in-from-left-2 duration-400 delay-100">
              <Label htmlFor="password" className="transition-colors duration-200 hover:text-blue-600">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-10 pr-10 transition-all duration-200 focus:scale-[1.02] hover:shadow-md ${errors.password ? 'border-red-500 animate-pulse' : 'focus:border-blue-500'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 animate-in slide-in-from-left-1 duration-200">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div className={`space-y-2 animate-in slide-in-from-right-2 duration-400 delay-200 ${isLogin ? 'animate-out slide-out-to-right-2' : ''}`}>
                <Label htmlFor="confirmPassword" className="transition-colors duration-200 hover:text-blue-600">Confirm Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 transition-colors duration-200 group-focus-within:text-blue-500" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword || ''}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`pl-10 pr-10 transition-all duration-200 focus:scale-[1.02] hover:shadow-md ${errors.confirmPassword ? 'border-red-500 animate-pulse' : 'focus:border-blue-500'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 animate-in slide-in-from-right-1 duration-200">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end animate-in fade-in duration-300 delay-400">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-all duration-200 hover:scale-105 active:scale-95"
                  onClick={() => alert('Forgot password clicked')}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] animate-in slide-in-from-bottom-2 duration-500 delay-300"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                isLogin ? 'Sign in' : 'Create account'
              )}
            </Button>
          </div>

          <div className="relative animate-in fade-in duration-400 delay-500">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500 transition-colors duration-200">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-bottom-2 duration-500 delay-600">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('Google')}
              className="w-full transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('GitHub')}
              className="w-full transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
            >
              <Github className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
              GitHub
            </Button>
          </div>

          <div className="text-center text-sm animate-in fade-in duration-500 delay-700">
            <span className="text-gray-600 transition-colors duration-200">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              type="button"
              onClick={toggleMode}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForms;