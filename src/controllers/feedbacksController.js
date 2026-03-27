import Feedback from '../models/feedback.js';

export const getFeedbacks = async (req, res) => {
  try {
    const { locationId } = req.query;

    const feedbacks = await Feedback.find({ locationId });

    res.json(feedbacks);
  } catch {
    res.status(500).json({ message: 'Failed to process request' });
  }
};

export const createFeedback = async (req, res) => {
  try {
    const { rate, description, userName, locationId } = req.body;

    if (!rate || !description || !userName || !locationId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newFeedback = await Feedback.create({
      rate,
      description,
      userName,
      locationId,
    });

    res.status(201).json(newFeedback);
  } catch {
    res.status(500).json({ message: 'Failed to process request' });
  }
};
