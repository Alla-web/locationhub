import { Schema, model } from 'mongoose';

const locationSchema = new Schema(
  {
    image: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    locationType: {
      type: Schema.Types.ObjectId,
      ref: 'LocationType',
      required: true,
    },
    region: { type: Schema.Types.ObjectId, ref: 'Region', requred: true },
    rate: { type: Number, default: 0, min: 0, max: 5 },
    description: { type: String, required: true, trim: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    feedbacks: { type: Schema.Types.ObjectId, ref: 'Feedback', required: true },
  },
  {
    timestamps: true,
    versionKey: true,
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
