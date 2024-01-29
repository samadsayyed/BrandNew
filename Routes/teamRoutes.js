import express from "express"
import { isAuthenticated,isAdmin } from "../Utils/auth.js";
import { createTeam, deleteTeam, getAllTeams, getTeamById, updateTeam } from "../Controllers/teamController.js";

const router = express.Router();

router.route("/teams").get(isAuthenticated,getAllTeams).post(isAuthenticated,isAdmin,createTeam)
router.route("/teams/:teamId").get(getTeamById).put(updateTeam).delete(isAdmin,deleteTeam)

export default router