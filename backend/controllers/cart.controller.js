import { User } from "../models/user.models.js";

// Add to cart functionality
const addToCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in adding to cart" });
  }
};

// Remove the items from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await User.findByIdAndUpdate(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in deleting the item" });
  }
};
//Fetch user cart data
const getCartData = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData: cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in getting cart details" });
  }
};

export { addToCart, removeFromCart, getCartData };
