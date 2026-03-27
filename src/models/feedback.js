import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    rate: Number,
    description: String,
    userName: String,
    locationId: String,
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
