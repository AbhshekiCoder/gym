"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PaymentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true, // normalize
        trim: true,
    },
    plan: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});
const Payment = mongoose_1.default.model("Payment", PaymentSchema);
exports.default = Payment;
