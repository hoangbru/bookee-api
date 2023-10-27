import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {
  authRouter,
  bookRouter,
  genreRouter,
  booksGenresRouter,
} from "./routes";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

const routes = [authRouter, bookRouter, genreRouter, booksGenresRouter];

app.use(cors());
app.use(express.json());

app.use("/api", ...routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
