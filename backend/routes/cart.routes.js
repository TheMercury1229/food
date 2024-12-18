import express from "express";
import {
  getCartData,
  addToCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCartData);

export default cartRouter;
