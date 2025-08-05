import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    emailVerified: Date,
    image: String,
    verifyToken: String,
    verifyTokenExpires: Date,
    isVerified: { type: Boolean, default: false }, // Email verification status
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    resetPasswordTokenUsed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const User = mongoose.models?.User || mongoose.model('User', UserSchema);
