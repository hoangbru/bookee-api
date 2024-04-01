import { Router } from "express";
import { createReview, updateReview } from "../controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.route("/reviews").post(createReview).patch(updateReview);

export default reviewRouter;
