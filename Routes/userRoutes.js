import express from "express"
import { Profile, checkAuth, deleteUser, getAllUsers, getUserById, loginUser, logoutUser, registerAdmin, registerUser } from "../Controllers/userController.js";
import { isAuthenticated } from "../Utils/auth.js";

const router = express.Router();

router.route("/user/new").post(registerUser)
router.route("/user/all").get(getAllUsers)
router.route("/user/:userId").delete(isAuthenticated,deleteUser).get(isAuthenticated,getUserById)
router.route("/registeradmin").post(registerAdmin)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)
router.route("/profile").get(isAuthenticated,Profile)
router.route("/checkAuth").get(isAuthenticated,checkAuth)

export default router
