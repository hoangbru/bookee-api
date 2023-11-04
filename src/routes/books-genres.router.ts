import { Router } from "express";
import {
  createBooksGenres,
  getAllBooksGenres,
} from "../controllers/books-genres.controller";

const bookRouter = Router();

bookRouter.route("/books-genres").get(getAllBooksGenres).post(createBooksGenres);

export default bookRouter;
