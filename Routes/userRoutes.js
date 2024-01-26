import express from "express"
import { deleteUser, getAllUsers, getUserById, loginUser, logoutUser, registerAdmin, registerUser } from "../Controllers/userController.js";
import { isAuthenticated } from "../Utils/auth.js";

const router = express.Router();

router.route("/user/new").post(registerUser)
router.route("/user/all").get(getAllUsers)
router.route("/user/:userId").delete(isAuthenticated,deleteUser).get(isAuthenticated,getUserById)
router.route("/registeradmin").post(registerAdmin)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

export default router
