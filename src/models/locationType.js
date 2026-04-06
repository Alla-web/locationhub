import { Schema, model } from 'mongoose';

const locationTypeSchema = new Schema({
  type: { type: String, unique: true, required: true, trim: true },
  slug: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  shortDescription: { type: String, trim: true, required: true },
});


export const LocationType = model(
  'LocationType',
  locationTypeSchema,
  'locationTypes'
);
