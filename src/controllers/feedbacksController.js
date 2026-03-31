import { Feedback } from '../models/feedback.js';

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
  try {
    const { locationId, rate, text } = req.body;

    const newFeedback = await Feedback.create({
      locationId,
      rate,
      text,
      ownerId: req.user._id,
    });

    const populatedFeedback = await newFeedback.populate([
      { path: 'locationId' },
      { path: 'ownerId' },
    ]);

    res.status(201).json(populatedFeedback);
  } catch {
    res.status(500).json({ message: 'Failed to process request' });
  }
};
