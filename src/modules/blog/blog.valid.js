import joi from 'joi';

export const createBlogSchema = joi.object({
  title: joi.string().min(3).max(10).required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title must not exceed 10 characters',
    'any.required': 'Title is required'
  }),
  description: joi.string().min(10).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description cannot be empty',
    'string.min': 'Description must be at least 10 characters long',
    'any.required': 'Description is required'
  })
});

export const blogDetailsSchema = joi.object({
  id: joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive number',
    'any.required': 'ID is required'
  })
});