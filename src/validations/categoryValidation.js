import { Joi, Segments } from 'celebrate';

export const getCategoriesWithRegionsSchema = {
  [Segments.QUERY]: Joi.object({}),
};

export const getCategoriesWithLocationTypesSchema = {
  [Segments.QUERY]: Joi.object({}),
};
