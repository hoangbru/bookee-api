import { Router } from "express";
import { createOrderDetail } from "../controllers/order-detail.controller";

const orderDetailRouter = Router();

orderDetailRouter.post("/order-details", createOrderDetail);

export default orderDetailRouter;
