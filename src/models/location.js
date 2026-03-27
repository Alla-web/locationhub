import { Schema, model } from 'mongoose';
import './locationType.js';
import './region.js';
import './user.js';
// import './feedback.js';

const locationSchema = new Schema(
  {
    image: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    locationType: {
      type: Schema.Types.ObjectId,
      ref: 'LocationType',
      required: true,
    },
    region: { type: Schema.Types.ObjectId, ref: 'Region', required: true },
    rate: { type: Number, default: 0, min: 0, max: 5 },
    description: { type: String, required: true, trim: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
  },
  {
    timestamps: true,
    versionKey: '_version',
  }
);

locationSchema.index(
  {
    name: 'text',
    description: 'text',
  },
  {
    name: 'LocationTextIndex',
    weights: { name: 10, description: 5 },
    default_language: 'endlish',
  }
);

export const Location = model('Location', locationSchema, 'locations');
