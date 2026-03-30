import { Schema, model } from 'mongoose';

const locationTypeSchema = new Schema({
  name: { type: String, unique: true, required: true, trim: true },
  slug: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
});

export const LocationType = model(
  'LocationType',
  locationTypeSchema,
  'locationtypes'
);
