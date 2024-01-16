import express from "express"
import { isAuthenticated,isAdmin } from "../Utils/auth.js";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../Controllers/taskController.js";


const router = express.Router();

router.route("/tasks").get(getAllTasks).post(createTask);
router.route("/tasks/:taskId").get(getTaskById).put(updateTask).delete(deleteTask)

export default router