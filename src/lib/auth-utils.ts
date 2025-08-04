import bcrypt from 'bcryptjs';
import { User } from './models/User';
import mongoose from 'mongoose';

export async function authenticateUser(email: string, password: string) {
  try {
    // Connect to MongoDB using Mongoose
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!);
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !user.password) {
      return null;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null;
    }

    // Check if email is verified
    if (!user.isVerified) {
      throw new Error(
        'Please verify your email before signing in. Check your inbox for the verification link.',
      );
    }

    // Return user data for NextAuth
    return {
      id: user._id.toString(),
      name: user.name || user.email.split('@')[0],
      email: user.email,
      image: user.image || null,
    };
  } catch (err: any) {
    console.error('Error in authenticateUser:', err);

    // If it's a verification error, re-throw it so NextAuth can handle it properly
    if (err.message && err.message.includes('verify your email')) {
      throw err;
    }

    // For other errors (database connection, etc.), return null
    return null;
  }
}
