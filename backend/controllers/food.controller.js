import { foodItem } from "../models/foodItem.models.js";
import fs from "fs";

// Adding New Food Item
const addFoodItem = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({
      sucess: true,
      message: "Food Item Successfully added",
    });
  } catch (error) {
    console.log("Error occured while creating a new food item");
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// List all the food items
const listFood = async (req, res) => {
  try {
    const foods = await foodItem.find({});
    res.json({ success: true, data: foods }).status(200);
  } catch (error) {
    res.json({ success: false, error: "Server Error" });
  }
};
// remove or delete fooditem
const deleteFood = async (req, res) => {
  try {
    const food = await foodItem.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodItem.findByIdAndDelete(req.body.id);
    res
      .json({
        success: true,
        message: "Food Removed",
      })
      .status(204);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Food Removing is unsuccessfull",
    });
  }
};
//
export { addFoodItem, listFood, deleteFood };
