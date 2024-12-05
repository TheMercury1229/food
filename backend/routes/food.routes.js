import express from "express";
import {
  addFoodItem,
  listFood,
  deleteFood,
} from "../controllers/food.controller.js";
import { upload } from "../utils/imageUpload.js";
const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), addFoodItem);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", deleteFood);
export default foodRouter;
