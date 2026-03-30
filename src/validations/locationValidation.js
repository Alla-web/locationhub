import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const locationIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.error('locationId.invalid')
    : value;
};

export const getAllLocationsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(9).max(27).default(9),
    search: Joi.string().trim().allow(''),
    regionId: Joi.string().trim(),
    locationTypeId: Joi.string().trim(),
  }),
};

export const getlocationByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().required().custom(locationIdValidator).messages({
      'locationId.invalid':
        'Location ID - {#value} - must be valid mongo ID (24 characters in hex-format)',
    }),
  }),
};

export const createLocationSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(100).required().trim().messages({
      'string.base': 'Field name must be a string',
      'string.empty': 'Field name cannot be empty',
      'string.min': 'Field name should have at least 2 characters',
      'string.max': 'Field name should be less than 100 characters',
      'any.required': 'Field name is required',
    }),
    locationTypeId: Joi.string().hex().length(24).required().messages({
      'string.hex': 'LocationType must be a valid ObjectId',
      'string.length': 'LocationType must be 24 characters long',
      'any.required': 'LocationType is required',
    }),
    regionId: Joi.string().hex().length(24).required().messages({
      'string.hex': 'Region must be a valid ObjectId',
      'string.length': 'Region must be 24 characters long',
      'any.required': 'Region is required',
    }),
    description: Joi.string().min(10).max(1000).required().trim().messages({
      'string.empty': 'Field description cannot be empty',
      'string.min': 'Field description must be at least 10 characters',
      'string.max': 'Field description must be less than 1000 characters',
      'any.required': 'Field description is required',
    }),
    rate: Joi.number().min(0).max(5).optional(),
  }).options({ allowUnknown: false }),
};

export const updateLocationSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().required().custom(locationIdValidator).messages({
      'locationId.invalid':
        'Location ID - {#value} - must be valid mongo ID (24 characters in hex-format)',
    }),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(100).trim().messages({
      'string.base': 'Field name must be a string',
      'string.empty': 'Field name cannot be empty',
      'string.min': 'Field name should have at least 2 characters',
      'string.max': 'Field name should be less than 100 characters',
    }),
    locationTypeId: Joi.string().hex().length(24).messages({
      'string.hex': 'LocationType must be a valid ObjectId',
      'string.length': 'LocationType must be 24 characters long',
    }),
    regionId: Joi.string().hex().length(24).messages({
      'string.hex': 'Region must be a valid ObjectId',
      'string.length': 'Region must be 24 characters long',
    }),
    description: Joi.string().min(10).max(1000).trim().messages({
      'string.empty': 'Field description cannot be empty',
      'string.min': 'Field description must be at least 10 characters',
      'string.max': 'Field description must be less than 1000 characters',
    }),
    rate: Joi.number().min(0).max(5).optional(),
  })
    .min(1)
    .options({ allowUnknown: false }),
};
