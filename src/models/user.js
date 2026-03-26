import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: {
      type: String,
      required: true,
      minlength: [8, 'Password must contain at least 8 characters'],
      select: false,
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function () {
  if (!this.username) this.username = this.email;
});

userSchema.methods.toJSON = function () {
  const object = this.toObject();
  delete object.password;
  return object;
};

export const User = model('User', userSchema, 'users');
