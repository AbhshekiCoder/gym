"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = exports.user = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const razorpay_1 = __importDefault(require("razorpay"));
const Users_1 = __importDefault(require("../models/Users"));
const Payment_1 = __importDefault(require("../models/Payment"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// ➝ Signup
const signup = async (req, res) => {
    try {
        const { email, ...rest } = req.body;
        if (!email) {
            res.status(400).json({ success: false, message: "Email is required" });
            return;
        }
        const existUser = await Users_1.default.findOne({ email });
        if (existUser) {
            res.status(400).json({ success: false, message: "User already exists" });
            return;
        }
        await Users_1.default.create({ email, ...rest });
        res.status(201).json({ success: true, message: "Registered successfully" });
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err);
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.signup = signup;
// ➝ Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: "User not registered" });
            return;
        }
        // (🔐 Use bcrypt.compare() in production)
        const validUser = await Users_1.default.findOne({ email, password });
        if (!validUser) {
            res.status(400).json({ success: false, message: "Password is incorrect" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: validUser._id }, process.env.JWT_SECRET || "123456", {
            expiresIn: "1h",
        });
        res.status(200).json({ success: true, message: "Login successful", token });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.login = login;
// ➝ Get User by Token
const user = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) {
            res.status(400).json({ success: false, message: "Token required" });
            return;
        }
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded || !decoded.id) {
            res.status(400).json({ success: false, message: "Invalid token" });
            return;
        }
        const result = await Users_1.default.findById(decoded.id);
        if (result) {
            res.status(200).json({ success: true, data: result });
        }
        else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.user = user;
// ➝ Razorpay Payment
const razorpayInstance = new razorpay_1.default({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});
const payment = async (req, res) => {
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
        await Payment_1.default.create({
            name,
            email,
            phone,
            plan: plan.name,
        });
        res.status(201).json({ success: true, data: order });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.payment = payment;
