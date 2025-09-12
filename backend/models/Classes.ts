import mongoose from "mongoose";

const ClassesSchema = new mongoose.Schema({
  classname: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  trainer: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  attendees: {
    type: Number,
    default: 0, // optional, since in your SQL it wasn't required
  }
}, {
  timestamps: true // automatically adds createdAt & updatedAt
});

const Classes = mongoose.model("Classes", ClassesSchema);

export default Classes;
