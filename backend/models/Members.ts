import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  plan: {
    type: String,
    required: true,
  },
  membership: {
    type: String,
    required: true,
  },
  joined: {
    type: Date,
    required: true,
    default: Date.now, // auto set if not provided
  }
}, {
  timestamps: true
});

const Member = mongoose.model("Member", MemberSchema);
export default Member;
