import Joi from "joi";

export const adminSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().required(),
});
