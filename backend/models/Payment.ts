import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
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

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
