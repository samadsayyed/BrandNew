import { Team } from "../Model/Team.js";
import {User } from "../Model/Employ.js"

// Get all teams
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('members', 'username email');
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific team by ID
export const getTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId).populate('members', 'username email');

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    console.error('Error fetching team by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new team
export const createTeam = async (req, res) => {
  try {
    const { name, memberIds } = req.body;

    // Check if all members exist
    const membersExist = await User.find({ _id: { $in: memberIds } });
    if (membersExist.length !== memberIds.length) {
      return res.status(400).json({ error: 'One or more members do not exist' });
    }

    const newTeam = new Team({
      name,
      members: memberIds,
    });

    await newTeam.save();
    res.status(201).json({ message: 'Team created successfully', team: newTeam });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a team by ID
export const updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, memberIds } = req.body;

    // Check if all members exist
    const membersExist = await User.find({ _id: { $in: memberIds } });
    if (membersExist.length !== memberIds.length) {
      return res.status(400).json({ error: 'One or more members do not exist' });
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        name,
        members: memberIds,
      },
      { new: true, runValidators: true }
    ).populate('members', 'username email');

    if (!updatedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({ message: 'Team updated successfully', team: updatedTeam });
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a team by ID
export const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    const deletedTeam = await Team.findByIdAndDelete(teamId);

    if (!deletedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({ message: 'Team deleted successfully', team: deletedTeam });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
