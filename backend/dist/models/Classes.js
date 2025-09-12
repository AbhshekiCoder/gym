"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClassesSchema = new mongoose_1.default.Schema({
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
const Classes = mongoose_1.default.model("Classes", ClassesSchema);
exports.default = Classes;
