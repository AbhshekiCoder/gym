"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayments = exports.deleteClasses = exports.getClasses = exports.classes = exports.getMembers = exports.members = void 0;
const Members_1 = __importDefault(require("../models/Members"));
const Classes_1 = __importDefault(require("../models/Classes"));
const Payment_1 = __importDefault(require("../models/Payment"));
const members = async (req, res) => {
    const { name, plan, membership, joined } = req.body;
    try {
        const member = await Members_1.default.findOne({ where: { name: name } });
        const data = member?.toJSON();
        if (member) {
            const result = await Members_1.default.update({
                name,
                plan,
                membership,
                joined
            }, { where: { id: data.id } });
            if (result) {
                res.status(201).json({ success: true, message: "Member updated successfully" });
            }
        }
        else {
            const result = await Members_1.default.create({
                name,
                plan,
                membership,
                joined
            });
            if (result) {
                res.status(201).json({ success: true, message: 'Member added successfully' });
            }
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.members = members;
const getMembers = async (req, res) => {
    try {
        const result = await Members_1.default.findAll();
        if (result) {
            res.status(201).json({ success: true, data: result });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.send(500).json({ success: false, error: err.message });
        }
    }
};
exports.getMembers = getMembers;
const classes = async (req, res) => {
    const { classname, trainer, description, time, capacity, id, attendees } = req.body;
    console.log(classname, id);
    try {
        if (id) {
            const result = await Classes_1.default.findByPk(id);
            const data = result?.toJSON();
            console.log(data);
            if (result) {
                const result = await Classes_1.default.update({
                    classname,
                    trainer,
                    description,
                    time,
                    capacity,
                    attendees
                }, { where: { id: data.id } });
                if (result) {
                    res.status(201).json({ success: true, message: "Member updated successfully" });
                }
            }
        }
        else {
            console.log("hello");
            const result = await Classes_1.default.create({
                classname,
                trainer,
                description,
                time,
                capacity,
                attendees
            });
            if (result) {
                res.status(201).json({ success: true, message: 'Class added successfully' });
            }
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
            console.log(err.message);
        }
    }
};
exports.classes = classes;
const getClasses = async (req, res) => {
    try {
        const result = (await Classes_1.default.findAll());
        if (result) {
            res.status(201).json({ success: true, data: result });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.send(500).json({ success: false, error: err.message });
        }
    }
};
exports.getClasses = getClasses;
const deleteClasses = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Classes_1.default.destroy({ where: { id: id } });
        if (result) {
            res.status(201).json({ success: true, message: 'Classes deleted successfully' });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.deleteClasses = deleteClasses;
const getPayments = async (req, res) => {
    try {
        const result = await Payment_1.default.findAll();
        if (result) {
            res.status(201).json({ success: true, data: result });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
exports.getPayments = getPayments;
