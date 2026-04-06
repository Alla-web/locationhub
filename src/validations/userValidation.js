import { Joi, Segments } from 'celebrate';

export const updateUserProfileSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(50).trim().messages({
      'string.base': "Ім'я повинно бути рядком",
      'string.min': "Ім'я повинно містити мінімум 2 символи",
      'string.max': "Ім'я не може бути довшим за 50 символів",
    }),
  }).options({ allowUnknown: true }),
};
