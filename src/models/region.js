import { Schema, model } from 'mongoose';

const regionSchema = new Schema({
  name: { type: String, unique: true, required: true, trim: true },
  slug: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
});

export const Region = model('Region', regionSchema, 'regions');
