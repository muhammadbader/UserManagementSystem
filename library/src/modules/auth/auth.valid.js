import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});
