import express from "express";
import { getUserProfile, updateUserProfile, getAllUsers, fetchMemberDetails, createUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUserProfile);
router.put("/:id", updateUserProfile);
router.get("/", getAllUsers);
router.post("/create", createUser);
router.post("/details", fetchMemberDetails)

export default router;