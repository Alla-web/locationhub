import { Schema, model } from 'mongoose';

const locatuonTypeSchema = new Schema({
  name: { type: String, unique: true, required: true, trim: true },
  slug: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
});

export const locationType = model(
  'LocationType',
  locatuonTypeSchema,
  'locationTypes'
);
