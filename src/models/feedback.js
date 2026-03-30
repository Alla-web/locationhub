import mongoose, { Schema } from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 32,
  },
  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  locationId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
{
  timestamps: true
}
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
