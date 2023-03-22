import Joi from "joi";

export const adminSchema = Joi.object({
  username: Joi.string().trim().lowercase().required(),
  password: Joi.string().required(),
});
