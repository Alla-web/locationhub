import createHttpError from 'http-errors';

import { Location } from '../models/location.js';

export const getAllLocations = async (req, res) => {
  const { page = 1, perPage = 9, region, locationType, search } = req.query;

  const skip = (Number(page) - 1) * Number(perPage);

  const noteQuery = Location.find({ ownerId: req.user._id });

  if (search) noteQuery.where({ $text: { $search: search } });
  if (region) noteQuery.where('regionId').equals(region);
  if (locationType) noteQuery.where('locationTypeId').equals(locationType);

  const [totalLocations, locations] = await Promise.all([
    noteQuery.clone().countDocuments(),
    noteQuery
      .skip(skip)
      .limit(perPage)
      // .populate('locationType', 'name') - тобто можна окремі поля витягати
      .populate('locationTypeId')
      .populate('regionId')
      .populate('ownerId')
      .populate('feedbacksId'),
  ]);

  const totalPages = Math.ceil(totalLocations / perPage);

  res
    .status(200)
    .json({ page, perPage, totalPages, totalLocations, locations });
};

export const getLocatoinById = async (req, res) => {
  const locationId = req.params.locationId;

  const location = await Location.findById(locationId)
    .populate('locationTypeId')
    .populate('regionId')
    .populate('ownerId')
    .populate('feedbacksId');

  if (!location)
    throw createHttpError(404, `Location with ID: ${locationId} not found`);

  res.status(200).json(location);
};

export const createLocation = async (req, res) => {
  const newLocation = await Location.create({
    ...req.body,
    ownerId: req.user._id,
  });
  res.status(201).json(newLocation);
};

export const updateLocation = async (req, res) => {
  const { locationId } = req.params;

  const location = await Location.findById(locationId);

  if (!location) {
    throw createHttpError(404, `Location with ID ${locationId} not found`);
  }

  if (location.ownerId?.toString() !== req.user._id.toString()) {
    throw createHttpError(403, 'Forbidden');
  }

  const updatedLocation = await Location.findByIdAndUpdate(locationId, req.body, {
    returnDocument: 'after',
    runValidators: true,
  })
    .populate('locationTypeId')
    .populate('regionId')
    .populate('ownerId')
    .populate('feedbacksId');

  res.status(200).json(updatedLocation);
};
