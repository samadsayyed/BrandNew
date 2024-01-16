import { Task } from "../Model/Task.js";
import { User } from "../Model/Employ.js";
import { Team } from "../Model/Team.js";

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "username email")
      .populate("assignedTeam", "name");
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific task by ID
export const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId)
      .populate("assignedTo", "username email")
      .populate("assignedTeam", "name");

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, priority, assignedTo, assignedTeam } =
      req.body;

    // Check if the assigned user exists
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      return res.status(400).json({ error: "Assigned user not found" });
    }

    // Check if the assigned team exists
    const assignedTeamExists = await Team.findById(assignedTeam);
    if (!assignedTeamExists) {
      return res.status(400).json({ error: "Assigned team not found" });
    }

    const newTask = new Task({
      title,
      description,
      deadline,
      priority,
      assignedTo,
      assignedTeam,
    });

    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a task by ID
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, deadline, priority, assignedTo, assignedTeam } =
      req.body;

    // Check if the assigned user exists
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      return res.status(400).json({ error: "Assigned user not found" });
    }

    // Check if the assigned team exists
    const assignedTeamExists = await Team.findById(assignedTeam);
    if (!assignedTeamExists) {
      return res.status(400).json({ error: "Assigned team not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        deadline,
        priority,
        assignedTo,
        assignedTeam,
      },
      { new: true, runValidators: true }
    )
      .populate("assignedTo", "username email")
      .populate("assignedTeam", "name");

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
