import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().trim().required(),
  surname: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  birthdate: Joi.date().required(),
  event_name: Joi.string().trim().required(),
  event_id: Joi.number().required(),
});
