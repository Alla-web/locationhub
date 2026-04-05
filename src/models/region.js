import { Schema, model } from 'mongoose';

const regionSchema = new Schema({
  region: { type: String, unique: true, required: true, trim: true },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  level: {
    type: String,
    trim: true,
    required: true,
    enam: ['регіональне', 'обласне', 'локальне'],
  },
  note: { type: String, trim: true, default: '' },
});

export const Region = model('Region', regionSchema, 'regions');
