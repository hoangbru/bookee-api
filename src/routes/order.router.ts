import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter
  .route("/orders")
  .get(getAllOrders)
  .post(createOrder);

orderRouter
  .route("/order/:id")
  .get(getOrderById)
  .patch(updateOrder)

export default orderRouter;
