import express from "express";
import { deleteAccount, getUserDetails, updateDisplayPicture, updateProfile } from "../controllers/profile.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.put("/updateProfile", isAuthenticated, updateProfile);
router.delete("/deleteAccount", isAuthenticated, deleteAccount);
router.get("/getUserDetails", isAuthenticated, getUserDetails);
router.put("/updateDisplayPicture", isAuthenticated, updateDisplayPicture);

export default router;
