import joi from "joi";

export const lookUpMailSchema = joi.object({
  email: joi.string().email().trim().required(),
});
