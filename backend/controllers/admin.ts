import { Request, Response } from "express";
import  Member from "../models/Members";
import  Classes from "../models/Classes";
import  Payment from "../models/Payment";

// ➝ Add / Update Member
export const members = async (req: Request, res: Response): Promise<void> => {
  const { name, plan, membership, joined } = req.body;

  try {
    const existingMember = await Member.findOne({ name });

    if (existingMember) {
      existingMember.plan = plan;
      existingMember.membership = membership;
      existingMember.joined = joined;
      await existingMember.save();

      res.status(200).json({ success: true, message: "Member updated successfully" });
    } else {
      await Member.create({ name, plan, membership, joined });
      res.status(201).json({ success: true, message: "Member added successfully" });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

// ➝ Get All Members
export const getMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Member.find();
    res.status(200).json({ success: true, data: result });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

// ➝ Add / Update Classes
export const classes = async (req: Request, res: Response): Promise<void> => {
  const { classname, trainer, description, time, capacity, id, attendees } = req.body;

  try {
    if (id) {
      const existingClass = await Classes.findById(id);
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
    } else {
      await Classes.create({ classname, trainer, description, time, capacity, attendees });
      res.status(201).json({ success: true, message: "Class added successfully" });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

// ➝ Get All Classes
export const getClasses = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Classes.find();
    res.status(200).json({ success: true, data: result });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

// ➝ Delete Class
export const deleteClasses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Classes.findByIdAndDelete(id);

    if (deleted) {
      res.status(200).json({ success: true, message: "Class deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Class not found" });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

// ➝ Get Payments
export const getPayments = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Payment.find();
    res.status(200).json({ success: true, data: result });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
