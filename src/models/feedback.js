import { Schema, model } from 'mongoose';

import './user.js';

const feedbackSchema = {
  rate: { type: Number, required: true },
  description: { type: String, required: true, trim: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
};

export const Feedback = model('Feedback', feedbackSchema, 'feedbacks');
