import { Router } from "express";
import {
  createGenre,
  deleteGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
} from "../controllers/genre.controller";

const genreRouter = Router();

genreRouter.route("/genres").get(getAllGenres).post(createGenre);
genreRouter
  .route("/genre/:id")
  .get(getGenreById)
  .patch(updateGenre)
  .delete(deleteGenre);

export default genreRouter;
