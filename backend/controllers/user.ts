import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import User from "../models/Users";
import Payment from "../models/Payment";
import dotenv from 'dotenv';
dotenv.config()

// ➝ Signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, ...rest } = req.body;

    if (!email) {
      res.status(400).json({ success: false, message: "Email is required" });
      return;
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400).json({ success: false, message: "User already exists" });
      return;
    }

    await User.create({ email, ...rest });
    res.status(201).json({ success: true, message: "Registered successfully" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err)
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

// ➝ Login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false, message: "User not registered" });
      return;
    }

    // (🔐 Use bcrypt.compare() in production)
    const validUser = await User.findOne({ email, password });
    if (!validUser) {
      res.status(400).json({ success: false, message: "Password is incorrect" });
      return;
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET || "123456", {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

// ➝ Get User by Token
export const user = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.params;
    if (!token) {
      res.status(400).json({ success: false, message: "Token required" });
      return;
    }

    const decoded = jwt.decode(token) as { id: string } | null;
    if (!decoded || !decoded.id) {
      res.status(400).json({ success: false, message: "Invalid token" });
      return;
    }

    const result = await User.findById(decoded.id);
    if (result) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

// ➝ Razorpay Payment
const razorpayInstance = new Razorpay({
  key_id: process.env.KEY_ID!,
  key_secret: process.env.KEY_SECRET!,
});

export const payment = async (req: Request, res: Response): Promise<void> => {
  const { name, email, phone, plan } = req.body;
  try {
    if (!plan || !plan.price || !plan.name) {
      res.status(400).json({ success: false, message: "Invalid plan details" });
      return;
    }

    const options = {
      amount: plan.price * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    await Payment.create({
      name,
      email,
      phone,
      plan: plan.name,
    });

    res.status(201).json({ success: true, data: order });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
