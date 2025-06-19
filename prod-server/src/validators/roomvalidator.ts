  import Joi from 'joi';

  export const createRoomSchema = Joi.object({
    name: Joi.string().min(3).max(50).required()
      .messages({
        'string.empty': 'Room name is required',
        'string.min': 'Room name must be at least 3 characters',
        'string.max': 'Room name cannot exceed 50 characters'
      }),
    visibility: Joi.string().valid('public', 'private').required()
      .messages({
        'any.only': 'Visibility must be either public or private'
      }),
    pomodoroDuration: Joi.number().integer().min(15).max(60).required()
      .messages({
        'number.min': 'Pomodoro duration must be at least 15 minutes',
        'number.max': 'Pomodoro duration cannot exceed 60 minutes'
      }),
    shortBreakDuration: Joi.number().integer().min(3).max(15).required()
      .messages({
        'number.min': 'Short break must be at least 3 minutes',
        'number.max': 'Short break cannot exceed 15 minutes'
      }),
    longBreakDuration: Joi.number().integer().min(10).max(30).required()
      .messages({
        'number.min': 'Long break must be at least 10 minutes',
        'number.max': 'Long break cannot exceed 30 minutes'
      })
  });