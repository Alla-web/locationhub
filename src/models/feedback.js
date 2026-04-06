import { Schema, model } from 'mongoose';
import './user.js';
import './location.js';

const feedbackSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    locationId: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: '_version',
  }
);

export const Feedback = model('Feedback', feedbackSchema, 'feedbacks');
