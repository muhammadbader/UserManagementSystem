import Joi from "joi";

export const bookSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  author: Joi.string().min(3).max(50).required(),
  isbn: Joi.string().length(13).required(),
});

export const bookUpdateSchema = Joi.object({
  id: Joi.number().integer().required(),
  title: Joi.string().min(3).max(100),
  author: Joi.string().min(3).max(50),
  isbn: Joi.string().length(13),
}).or("title", "author", "isbn");
