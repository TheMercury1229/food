import express from "express";
import {
  getCartData,
  addToCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.post("/remove", removeFromCart);
cartRouter.post("/get", getCartData);

export default cartRouter;
