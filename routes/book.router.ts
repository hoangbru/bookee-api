import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/book.controller";

const bookRouter = Router();

bookRouter
  .route("/books")
  .get(getAllBooks)
  .post(createBook)
  .patch(updateBook)
  .delete(deleteBook);

bookRouter
  .route("/book/:id")
  .get(getBookById)

export default bookRouter;
