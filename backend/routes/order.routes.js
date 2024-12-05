import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { listOrders, placeOrder, updateOrderStatus, userOrders, verifyOrder } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.get("/userorders", authMiddleware, userOrders);
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateOrderStatus)

export default orderRouter;
