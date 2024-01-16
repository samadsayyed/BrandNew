// Import Mongoose
import mongoose from "mongoose"

// Define Task Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date },
  priority: { type: String, enum: ['Low', 'Medium', 'High'] },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }, // New field for team assignment
  // Add any other fields you may need for tasks
});

// Create Task Model
export const Task = mongoose.model('Task', taskSchema);

