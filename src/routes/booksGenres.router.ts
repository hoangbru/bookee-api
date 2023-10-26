import { Router } from "express";
import {
  createBooksGenres,
  getAllBooksGenres,
} from "../controllers/booksGenres.controller";

const bookRouter = Router();

bookRouter.route("/books-genres").get(getAllBooksGenres).post(createBooksGenres);

export default bookRouter;
