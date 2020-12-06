import Joi from '@hapi/joi';

export const createMessage = Joi.object({
  hours: Joi.number().integer().min(0).max(23).required(),
  minutes: Joi.number().integer().min(0).max(59).required(),
  message: Joi.string().min(1).max(250).required()
});

export const getMessage = Joi.object({
  id: Joi.string().regex(/^[a-zA-Z0-9_-]{10}$/).required()
});

