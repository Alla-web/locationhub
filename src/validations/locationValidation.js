import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const locationIdValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.error('locationId.invalid');
  }
  return value;
};

export const getAllLocationsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(27).default(9),
    search: Joi.string().trim().empty(''),
    regionId: Joi.string().hex().length(24).empty(''),
    locationTypeId: Joi.string().hex().length(24).empty(''),
    sort: Joi.string()
      .valid(
        'name-asc',
        'name-desc',
        'rate-asc',
        'rate-desc',
        'newest',
        'oldest'
      )
      .empty(''),
  }),
};

export const getlocationByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().required().custom(locationIdValidator).messages({
      'any.required': 'Location ID is required',
      'locationId.invalid':
        'Location ID - {#value} - must be a valid Mongo ID (24 hex characters)',
    }),
  }),
};

export const createLocationSchema = {
  [Segments.BODY]: Joi.object({
    image: Joi.string().uri().optional().messages({
      'string.uri': 'Image must be a valid URL',
    }),
    name: Joi.string().min(2).max(100).required().trim().messages({
      'string.base': 'Field name must be a string',
      'string.empty': 'Field name cannot be empty',
      'string.min': 'Field name should have at least 2 characters',
      'string.max': 'Field name should be less than 100 characters',
      'any.required': 'Field name is required',
    }),
    locationTypeId: Joi.string().hex().length(24).required().messages({
      'string.base': 'LocationTypeId must be a string',
      'string.hex': 'LocationTypeId must be a valid ObjectId',
      'string.length': 'LocationTypeId must be 24 characters long',
      'any.required': 'LocationTypeId is required',
    }),
    regionId: Joi.string().hex().length(24).required().messages({
      'string.base': 'RegionId must be a string',
      'string.hex': 'RegionId must be a valid ObjectId',
      'string.length': 'RegionId must be 24 characters long',
      'any.required': 'RegionId is required',
    }),
    rate: Joi.number().min(0).max(5).optional().messages({
      'number.base': 'Rate must be a number',
      'number.min': 'Rate must be at least 0',
      'number.max': 'Rate must be at most 5',
    }),
    description: Joi.string().min(10).max(1000).required().trim().messages({
      'string.base': 'Field description must be a string',
      'string.empty': 'Field description cannot be empty',
      'string.min': 'Field description must be at least 10 characters',
      'string.max': 'Field description must be less than 1000 characters',
      'any.required': 'Field description is required',
    }),
  }).options({ allowUnknown: false }),
};

export const updateLocationSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().required().custom(locationIdValidator).messages({
      'any.required': 'Location ID is required',
      'locationId.invalid':
        'Location ID - {#value} - must be a valid Mongo ID (24 hex characters)',
    }),
  }),
  [Segments.BODY]: Joi.object({
    image: Joi.string().uri().optional().messages({
      'string.uri': 'Image must be a valid URL',
    }),
    name: Joi.string().min(2).max(100).trim().messages({
      'string.base': 'Field name must be a string',
      'string.empty': 'Field name cannot be empty',
      'string.min': 'Field name should have at least 2 characters',
      'string.max': 'Field name should be less than 100 characters',
    }),
    locationTypeId: Joi.string().hex().length(24).messages({
      'string.base': 'LocationTypeId must be a string',
      'string.hex': 'LocationTypeId must be a valid ObjectId',
      'string.length': 'LocationTypeId must be 24 characters long',
    }),
    regionId: Joi.string().hex().length(24).messages({
      'string.base': 'RegionId must be a string',
      'string.hex': 'RegionId must be a valid ObjectId',
      'string.length': 'RegionId must be 24 characters long',
    }),
    rate: Joi.number().min(0).max(5).messages({
      'number.base': 'Rate must be a number',
      'number.min': 'Rate must be at least 0',
      'number.max': 'Rate must be at most 5',
    }),
    description: Joi.string().min(10).max(1000).trim().messages({
      'string.base': 'Field description must be a string',
      'string.empty': 'Field description cannot be empty',
      'string.min': 'Field description must be at least 10 characters',
      'string.max': 'Field description must be less than 1000 characters',
    }),
  })
    .min(1)
    .options({ allowUnknown: false }),
};
