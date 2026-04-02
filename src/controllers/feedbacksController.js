import createHttpError from 'http-errors';

import { Feedback } from '../models/feedback.js';
import { Location } from '../models/location.js';
import { createTestAccount } from 'nodemailer';

export const getFeedbacks = async (req, res) => {
  try {
    const { locationId, page, perPage } = req.query;

    const pageNum = Number(page);
    const perPageNum = Number(perPage);
    const skip = (pageNum - 1) * perPageNum;

    const filter = { locationId };

    const [totalFeedbacks, feedbacks] = await Promise.all([
      Feedback.countDocuments(filter),
      Feedback.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPageNum)
        .populate('userId', 'name email'),
    ]);

    const totalPages = Math.ceil(totalFeedbacks / perPageNum) || 1;

    res.status(200).json({
      page: pageNum,
      perPage: perPageNum,
      totalPages,
      totalFeedbacks,
      feedbacks,
    });
  } catch {
    res.status(500).json({ message: 'Failed to process request' });
  }
};

export const createFeedback = async (req, res) => {
  const { locationId, rate, text } = req.body;

  if (!locationId) throw createHttpError(400, 'LocationId is required');

  if (typeof rate !== 'number' || rate < 1 || rate > 5) {
    throw createHttpError(400, 'Rate must be a number from 1 to 5');
  }

  const existingFeedback = await Feedback.findOne({
    locationId,
    ownerId: req.user._id,
  });

  if (existingFeedback) {
    throw createHttpError(
      409,
      'You have already left feedback for this location'
    );
  }

  const ratedLocation = await Location.findById(locationId);

  if (!ratedLocation)
    throw createHttpError(404, `Location with ID - ${locationId} not found`);

  const feedbacks = await Feedback.find({ locationId }).select('rate');

  const ratingsSum = feedbacks.reduce(
    (sum, feedback) => sum + feedback.rate,
    0
  );

  const currentRating = Number(
    (ratingsSum + rate) / (feedbacks.length + 1)
  ).toFixed(1);

  const newFeedback = await Feedback.create({
    locationId,
    rate,
    text,
    ownerId: req.user._id,
  });

  await Location.findByIdAndUpdate(locationId, {
    rate: currentRating,
    $push: { feedbacksId: newFeedback._id },
  });

  const populatedFeedback = await newFeedback.populate([
    { path: 'locationId' },
    { path: 'ownerId' },
  ]);

  res.status(201).json(populatedFeedback);
};
