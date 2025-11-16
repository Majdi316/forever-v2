//TODO Libraries
import Stripe from "stripe";
import dotenv from "dotenv";
//TODO Models
import Order from "../models/Order.js";
import { User } from "../models/User.js";
dotenv.config({ quiet: true });
//global variables
const currency = "usd";
const deliveryCharge = 10;
const stripeSecretKey = process.env.STRIP_SECRET_KEY;
//gateway initialize
const stripe = new Stripe(stripeSecretKey);

/**-------------------------------------------------
 * @desc  Placing orders using COD method 
 * @route  /place
 * @method  POST
 * @access private (users)
 ---------------------------------------------------*/
const placeOrderController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, amount, address } = req.body;
    //! Validate request body
    if (!items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    //create order
    const newOrder = new Order(orderData);
    await newOrder.save();
    //clear Cart data
    await User.findByIdAndUpdate(userId, { cartData: {} });
    res.status(201).json({ success: true, message: "Order Placed" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
/**-------------------------------------------------
 * @desc  Placing orders using Stripe method
 * @route  /place
 * @method  POST
 * @access private (users)
 ---------------------------------------------------*/
const placeOrderStripeController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    //create order
    const newOrder = new Order(orderData);
    await newOrder.save();

    //create line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    //create new session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.status(201).json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/**-------------------------------------------------
 * @desc  Verify Stripe Payment
 * @route  /verifyStripe
 * @method  POST
 * @access private (users)
 ---------------------------------------------------*/
const verifyStripePayment = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      //update order payment status
      await Order.findByIdAndUpdate(orderId, { payment: true });
      //clear Cart data
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.status(200).json({
        success: true,
      });
    } else {
      //delete the order
      await Order.findByIdAndDelete(orderId);
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/**-------------------------------------------------
 * @desc  All Orders data for Manager panel
 * @route  /list
 * @method  POST
 * @access private (Only Manager)
 ---------------------------------------------------*/
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/**-------------------------------------------------
 * @desc  user Orders data for frontend
 * @route  /userOrders
 * @method  POST
 * @access private (Only User himself)
 ---------------------------------------------------*/
const getUserOrdersController = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/**-------------------------------------------------
 * @desc  Update order status from admin panel
 * @route  /status
 * @method  POST
 * @access private (Only Manager)
 ---------------------------------------------------*/
const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res
      .status(200)
      .json({ success: true, message: "Status Updated Successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export {
  placeOrderController,
  placeOrderStripeController,
  verifyStripePayment,
  getAllOrdersController,
  getUserOrdersController,
  updateOrderStatusController,
};
