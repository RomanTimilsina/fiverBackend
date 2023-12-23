import express from "express"
import {deleteUser} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";
import { createGig, deleteGig, getGig, getGigs } from "../controllers/gig.controller.js";

const router = express.Router()

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig)
router.get("/single/:id", getGig)
router.get("/", getGigs)

export default router;