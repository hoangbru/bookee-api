import { Router } from "express";
import {
  createOrderDetail,
  getAllOrderDetails,
  getOrderDetailById,
  updateOrderDetail,
} from "../controllers/order-detail.controller";

const orderDetailRouter = Router();

orderDetailRouter
  .route("/order-details")
  .get(getAllOrderDetails)
  .post(createOrderDetail);

orderDetailRouter
  .route("/order-detail/:id")
  .get(getOrderDetailById)
  .patch(updateOrderDetail)

export default orderDetailRouter;
