import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter
  .route("/categories")
  .get(getAllCategories)
  .post(createCategory);

categoryRouter
  .route("/category/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
