import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/book.controller";

const bookRouter = Router();

bookRouter.route("/books").get(getAllBooks).post(createBook);
bookRouter
  .route("/book/:id")
  .get(getBookById)
  .patch(updateBook)
  .delete(deleteBook);

export default bookRouter;
