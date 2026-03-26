import createHttpError from 'http-errors';

import { Location } from '../models/location.js';

export const getAllLocations = async (req, res) => {
  const { page = 1, perPage = 9, region, locationType, search } = req.query;

  const skip = (Number(page) - 1) * Number(perPage);

  //                             { owner: req.user._id }
  const noteQuery = Location.find();

  if (search) noteQuery.where({ $text: { $search: search } });
  if (region) noteQuery.where('region').equals(region);
  if (locationType) noteQuery.where('locationType').equals(locationType);

  const [totalLocations, locations] = await Promise.all([
    noteQuery.clone().countDocuments(),
    noteQuery
      .skip(skip)
      .limit(perPage)
      // .populate('locationType', 'name') - тобто можна окремі поля витягати
      .populate('locationType')
      .populate('region')
      .populate('owner')
      .populate('feedbacks'),
  ]);

  const totalPages = Math.ceil(totalLocations / perPage);

  res
    .status(200)
    .json({ page, perPage, totalPages, totalLocations, locations });
};

export const getLocatoinById = async (req, res) => {
  const locationId = req.params.locationId;

  //                                                       , userId: req.user._id
  const location = await Location.findOne({ _id: locationId })
    .populate('region')
    .populate('locationType')
    .populate('owner')
    .populate('feedbacks');

  if (!location)
    throw createHttpError(404, `Location with ID: ${locationId} not found`);

  res.status(200).json(location);
};

export const createLocation = async (req, res) => {
  //                                                    , userId: req.user._id
  const newLocation = await Location.create({ ...req.body });
  res.status(201).json(newLocation);
};
