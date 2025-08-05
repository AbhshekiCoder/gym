"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = exports.user = exports.login = exports.signup = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const razorpay_1 = __importDefault(require("razorpay"));
const Payment_1 = __importDefault(require("../models/Payment"));
const signup = async (req, res) => {
    try {
        const result = await Users_1.default.create(req.body);
        res.status(201).json({ success: true, message: "registered successfully" });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
        else {
            res.status(500).json({ success: false, error: "Unknown error" });
        }
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users_1.default.findOne({ where: { email: email } });
        if (!user) {
            res.status(500).json({ success: false, message: "user not registered" });
            return;
        }
        const result = await Users_1.default.findOne({ where: { email: email, password: password } });
        if (result) {
            let user = result.toJSON();
            const token = jsonwebtoken_1.default.sign({ id: user.id }, '123456', { expiresIn: "1h" });
            res.status(200).json({ success: true, message: "login successfully", token: token });
        }
        else {
            res.status(500).json({ success: false, message: "password is incorrect" });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
            console.log(err.message);
        }
        else {
            res.status(500).json({ success: false, error: "Unknown error" });
        }
    }
};
exports.login = login;
const user = async (req, res) => {
    try {
        const { token } = req.params;
        console.log(token);
        const decode = jsonwebtoken_1.default.decode(token);
        const id = decode.id;
        const result = await Users_1.default.findByPk(id);
        if (result) {
            res.status(200).json({ success: true, data: result });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
        else {
            res.status(500).json({ success: false, error: "Unknown error" });
        }
    }
};
exports.user = user;
const razorpayInstance = new razorpay_1.default({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});
const payment = async (req, res) => {
    const { name, email, phone, plan } = req.body;
    try {
        const options = {
            amount: plan.price * 100,
            currency: "INR",
            receipt: "receipt#1"
        };
        const order = await razorpayInstance.orders.create(options);
        const result = await Payment_1.default.create({
            name,
            email,
            phone,
            plan: plan.name
        });
        if (result) {
            console.log(order);
            res.status(201).json({ success: true, data: order });
        }
    }
    catch (err) {
        console.log(err);
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
};
exports.payment = payment;
