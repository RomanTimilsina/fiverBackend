import express from "express"
import {createReview,
        getReview,
        deleteReview
      } from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router()

router.post("/", verifyToken, createReview)
router.get("/:gigId", getReview)
router.delete("/:id", deleteReview)

export default router;
