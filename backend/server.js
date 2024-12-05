// Importing Packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// Configuring dotenv
dotenv.config({ path: "./.env" });
import { connectDatabase } from "./config/db.config.js";
import foodRouter from "./routes/food.routes.js";
import userRouter from "./routes/user.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
// app configuration
const app = express();
const port = process.env.PORT||5000;
// middlewares initialisation
app.use(express.json()); // parse request body as json
app.use(
  cors({
    origin: ["https://food-6zgg.vercel.app","https://food-nu-liard.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
// Connecting DB
app.use("/images", express.static("uploads"));
connectDatabase().then(() => {
  app.listen(port, (req, res) => {
    console.log(`server is running on port ${port}`);
  });
});
// Api EndPoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
