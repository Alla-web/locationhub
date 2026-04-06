import { Joi, Segments } from 'celebrate';

export const getFeedbacksSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(10),
    locationId: Joi.string().hex().length(24),
  }),
};

export const createFeedbacksSchema = {
  [Segments.BODY]: Joi.object({
    locationId: Joi.string().hex().length(24).optional().required(),
    description: Joi.string().trim().min(10).max(100).required(),
    rate: Joi.number().min(1).max(5).required(),
  }),
};
