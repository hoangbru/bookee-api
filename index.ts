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
} from "./src/routes";

dotenv.config();

const port: number = 8080

const app = express();

const routers = [
  authRouter,
  bookRouter,
  genreRouter,
  booksGenresRouter,
  orderRouter,
  orderDetailRouter,
];

app.use(cors());
app.use(express.json());

app.use("/api", ...routers);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
