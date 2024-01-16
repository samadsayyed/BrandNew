// Import Mongoose
import mongoose from "mongoose"

// Define Team Schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // Add any other fields you may need for teams
});

// Create Team Model
export const Team = mongoose.model('Team', teamSchema);