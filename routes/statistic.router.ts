import { Router } from "express";
import { getGraphRevenue, getOrderCount, getTotalRevenue } from "../controllers/statistic.controller";

const statisticRouter = Router();

statisticRouter.get("/statistics/graph-revenue", getGraphRevenue);
statisticRouter.get("/statistics/total-revenue", getTotalRevenue);
statisticRouter.get("/statistics/order-count", getOrderCount);

export default statisticRouter;
