
import createHttpError from 'http-errors';
import { Location } from '../models/location.js';
import { uploadImageToCloudinary } from '../services/uploadImageToCloudinary.js';

export const getAllLocations = async (req, res) => {
  const {
    page = 1,
    perPage = 9,
    regionId,
    locationTypeId,
    search,
  } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);
  const skip = (pageNumber - 1) * perPageNumber;

  const locationQuery = Location.find({ ownerId: req.user._id });

  if (search) {
    locationQuery.where({ $text: { $search: search } });
  }

  if (regionId) {
    locationQuery.where('regionId').equals(regionId);
  }

  if (locationTypeId) {
    locationQuery.where('locationTypeId').equals(locationTypeId);
  }

  const [totalLocations, locations] = await Promise.all([
    locationQuery.clone().countDocuments(),
    locationQuery
      .skip(skip)
      .limit(perPageNumber)
      .populate('locationTypeId')
      .populate('regionId')
      .populate('ownerId')
      .populate('feedbacksId'),
  ]);

  const totalPages = Math.ceil(totalLocations / perPageNumber);

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalPages,
    totalLocations,
    locations,
  });
};

export const getLocationById = async (req, res) => {
  const { locationId } = req.params;

  const location = await Location.findOne({
    _id: locationId,
    ownerId: req.user._id,
  })
    .populate('regionId')
    .populate('locationTypeId')
    .populate('ownerId')
    .populate('feedbacksId');

  if (!location) {
    throw createHttpError(404, `Location with ID: ${locationId} not found`);
  }

  res.status(200).json(location);
};

export const createLocation = async (req, res) => {


  let imageUrl = req.body.image;


  if (req.file) {
    const uploadedImage = await uploadImageToCloudinary(req.file.buffer);
    imageUrl = uploadedImage.secure_url;
  }

  if (!imageUrl) {
    throw createHttpError(400, 'Image is required');
  }

  const newLocation = await Location.create({
    ...req.body,
    image: imageUrl,
    ownerId: req.user._id,
  });


  const populatedLocation = await Location.findById(newLocation._id)
    .populate('regionId')
    .populate('locationTypeId')
    .populate('ownerId')
    .populate('feedbacksId');


  res.status(201).json(populatedLocation);
};

export const updateLocation = async (req, res) => {
  const { locationId } = req.params;

  const updatePayload = { ...req.body };

  if (req.file) {
    const uploadedImage = await uploadImageToCloudinary(req.file.buffer);
    updatePayload.image = uploadedImage.secure_url;
  }

  const updatedLocation = await Location.findOneAndUpdate(
    { _id: locationId, ownerId: req.user._id },
    updatePayload,
    { returnDocument: 'after' }
  )
    .populate('regionId')
    .populate('locationTypeId')
    .populate('ownerId')
    .populate('feedbacksId');

  if (!updatedLocation) {
    throw createHttpError(404, `Location with ID ${locationId} not found`);
  }

  res.status(200).json(updatedLocation);
};
