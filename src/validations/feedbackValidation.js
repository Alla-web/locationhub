import { Joi, Segments } from "celebrate";


export const getFeedbacksSchema = {
  [Segments.QUERY]: Joi.object({
    locationId: Joi.string().hex().length(24).required(),
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(10),
  }),
};

export const createFeedbacksSchema = {
  [Segments.BODY]: Joi.object({
    locationId: Joi.string().hex().length(24).required(),
    userName: Joi.string().trim().min(2).max(32).required(),
    rate: Joi.number().min(1).max(5).required(),
    description: Joi.string().trim().min(1).max(200).required(),
  }),
};
