import Order from "../models/order.models.js";
import { User } from "../models/user.models.js";
import Stripe from "stripe";
import dotenv from "dotenv";

// Configuring dotenv
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing User Order from frontend
const placeOrder = async (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  try {
    // Validate input data
    const { userId, items, amount, address } = req.body;
    if (!userId || !items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input data" });
    }
    console.log(req.body.items);
    // Create new order
    const newOrder = new Order({
      userId,
      items: items,
      amount,
      address,
    });
    await newOrder.save();

    // Clear user cart
    await User.findByIdAndUpdate(userId, { cartData: {} });

    // Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Assuming price is in INR
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 20 * 100, // Delivery charges in INR
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&order=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&order=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error in placing order",
        error: error.message,
      });
  }
};

const verifyOrder = async (req, res) => {
  const {orderId,success}=req.body;
  try {
    if(success=="true"){
      await Order.findByIdAndUpdate(orderId, {payment:success});
      res.json({ success: true, message: "Payment successfull" });
    }else{
      await Order.findByIdAndDelete(orderId);
      res.json({ success: true, message: "Payment failed" });
    }

    
  } catch (error) {
    console.error("Error verifying order:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error in verifying order",
      });
    
  }
}
const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.body.userId });
    res.json({ success: true, orders: orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error in fetching orders",
      });
    
  }
}

// Listing orders for admin panel
const listOrders=async(req,res)=>{
  try {
    const orders=await Order.find({})
    res.json({success:true,data:orders})
  } catch (error) {
    console.log("Error in listing order for admin")
    res.json({success:false,message:"Error occured in fetching orders"})
    
  }
}
// Updating the status
const updateOrderStatus=async(req,res)=>{
try {
  const {orderId,status}=req.body;
  await Order.findByIdAndUpdate(orderId,{status});
  res.json({success:true,message:"Status updated successfully"})
} catch (error) {
  console.log("Error in updating order status")
  res.json({success:false,message:"Error occured in updating order status"})
}
}
export { placeOrder ,verifyOrder,userOrders,listOrders,updateOrderStatus};
