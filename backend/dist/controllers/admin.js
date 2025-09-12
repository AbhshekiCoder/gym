"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayments = exports.deleteClasses = exports.getClasses = exports.classes = exports.getMembers = exports.members = void 0;
const Members_1 = __importDefault(require("../models/Members"));
const Classes_1 = __importDefault(require("../models/Classes"));
const Payment_1 = __importDefault(require("../models/Payment"));
// ➝ Add / Update Member
const members = async (req, res) => {
    const { name, plan, membership, joined } = req.body;
    try {
        const existingMember = await Members_1.default.findOne({ name });
        if (existingMember) {
            existingMember.plan = plan;
            existingMember.membership = membership;
            existingMember.joined = joined;
            await existingMember.save();
            res.status(200).json({ success: true, message: "Member updated successfully" });
        }
        else {
            await Members_1.default.create({ name, plan, membership, joined });
            res.status(201).json({ success: true, message: "Member added successfully" });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.members = members;
// ➝ Get All Members
const getMembers = async (req, res) => {
    try {
        const result = await Members_1.default.find();
        res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.getMembers = getMembers;
// ➝ Add / Update Classes
const classes = async (req, res) => {
    const { classname, trainer, description, time, capacity, id, attendees } = req.body;
    try {
        if (id) {
            const existingClass = await Classes_1.default.findById(id);
            if (!existingClass) {
                res.status(404).json({ success: false, message: "Class not found" });
                return;
            }
            existingClass.classname = classname;
            existingClass.trainer = trainer;
            existingClass.description = description;
            existingClass.time = time;
            existingClass.capacity = capacity;
            existingClass.attendees = attendees;
            await existingClass.save();
            res.status(200).json({ success: true, message: "Class updated successfully" });
        }
        else {
            await Classes_1.default.create({ classname, trainer, description, time, capacity, attendees });
            res.status(201).json({ success: true, message: "Class added successfully" });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.classes = classes;
// ➝ Get All Classes
const getClasses = async (req, res) => {
    try {
        const result = await Classes_1.default.find();
        res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.getClasses = getClasses;
// ➝ Delete Class
const deleteClasses = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Classes_1.default.findByIdAndDelete(id);
        if (deleted) {
            res.status(200).json({ success: true, message: "Class deleted successfully" });
        }
        else {
            res.status(404).json({ success: false, message: "Class not found" });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.deleteClasses = deleteClasses;
// ➝ Get Payments
const getPayments = async (req, res) => {
    try {
        const result = await Payment_1.default.find();
        res.status(200).json({ success: true, data: result });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.getPayments = getPayments;
