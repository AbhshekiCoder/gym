import { where } from "sequelize";
import User from "../models/Users"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import razorpay from 'razorpay';
import Payment from "../models/Payment";


export const signup = async (req: Request, res: Response) => {
  try {
    const result = await User.create(req.body);
    res.status(201).json({ success: true, message: "registered successfully" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.status(500).json({ success: false, error: "Unknown error" });
    }
  }
};

export const login = async (req: Request, res: Response) =>{
  try{
    const {email, password} = req.body;
    
    const user = await User.findOne({where:{email: email} });
    if(!user){
      res.status(500).json({success: false, message: "user not registered"});
      return;
    }
    const result = await User.findOne({where:{email: email, password: password}});
    if(result){
      let user = result.toJSON()
     
      const token = jwt.sign({id: user.id}, '123456', {expiresIn: "1h"});
     
      res.status(200).json({success: true, message: "login successfully", token: token});

    }
    else{
      res.status(500).json({success: false, message: "password is incorrect"})
    }
    
  }catch(err: unknown){
     if (err instanceof Error) {
      res.status(500).json({ success: false, error: err.message });
      console.log(err.message)
    } else {
      res.status(500).json({ success: false, error: "Unknown error" });
    }

  }
}
  export const user = async (req: Request, res: Response) =>{
    try{
      const {token} = req.params;     
      console.log(token)
      const decode = jwt.decode(token) as {id: number}
      const id: number = decode.id; 

      const result = await User.findByPk(id);
      if(result){
        res.status(200).json({success: true, data: result});
      }
    

  }catch(err: unknown){
    if(err instanceof Error){
    res.status(500).json({success: false, error: err.message})
    }  else {
      res.status(500).json({ success: false, error: "Unknown error" });
    }

  }
}

const razorpayInstance = new razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET
})

export const payment = async (req: Request, res: Response) =>{
  const {name, email, phone, plan } = req.body;
  try{
  const options = {
    amount: plan.price * 100,
    currency: "INR",
    receipt: "receipt#1"

  }

  const order = await razorpayInstance.orders.create(options);
  const result = await Payment.create({
    name,
    email,
    phone,
    plan: plan.name
  })
  if(result){
    console.log(order)
  res.status(201).json({success: true, data: order})

  }
  }catch(err: unknown){
    console.log(err)
    if(err instanceof Error){
      console.log(err.message)
    }
  }
}


