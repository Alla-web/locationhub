import Feedback from '../models/feedback.js';

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
        .populate("userId", "name email"),
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
    const { locationId, userName, rate, description } = req.body;

    const newFeedback = await Feedback.create({
      locationId,
      userName,
      rate,
      description,
      userId: req.user._id,
    });

    const populated = await newFeedback.populate("userId", "name email");

    res.status(201).json(populated);
  } catch {
    res.status(500).json({ message: 'Failed to process request' });
  }
};
