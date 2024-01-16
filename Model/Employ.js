import mongoose from "mongoose"

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // Add any other fields you may need for user profiles
});

// Create User Model
export const User = mongoose.model('User', userSchema);
