"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MemberSchema = new mongoose_1.default.Schema({
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
const Member = mongoose_1.default.model("Member", MemberSchema);
exports.default = Member;
