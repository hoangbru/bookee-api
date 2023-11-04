import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import {
  authRouter,
  bookRouter,
  genreRouter,
  booksGenresRouter,
  orderRouter,
  orderDetailRouter,
} from "./routes";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

const routes = [
  authRouter,
  bookRouter,
  genreRouter,
  booksGenresRouter,
  orderRouter,
  orderDetailRouter,
];

app.use(cors());
app.use(express.json());

app.use("/api", ...routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
