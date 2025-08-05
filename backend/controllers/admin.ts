import { Request, Response } from 'express';
import Member from '../models/Members';
import { where } from 'sequelize';
import Classes from '../models/Classes';
import Payment from '../models/Payment';


export const members = async(req: Request, res: Response)  =>{

    const {name, plan, membership, joined} = req.body;
    
    try{
        const member = await Member.findOne({where: {name: name}});
        const data = member?.toJSON();
    
        if(member){
            const result = await Member.update({
                name,
                plan,
                membership,
                joined
            },{ where:{id: data.id}})
         
            if(result){
                res.status(201).json({success: true, message: "Member updated successfully"})
            }
        }else{
        const result = await Member.create({
            name,
            plan,
            membership,
            joined
        })
        if(result){
            res.status(201).json({success: true, message: 'Member added successfully'})
        }
    }
    }catch(err: unknown){
        if(err instanceof Error){
            res.status(500).json({success: false, error: err.message});
        }
    }
} 

export const getMembers = async(req: Request, res: Response) =>{
    try{
        const result = await Member.findAll();
        if(result){
            res.status(201).json({success: true, data: result});
        }
    }catch(err: unknown){
        if(err instanceof Error){
            res.send(500).json({success: false, error: err.message});
        }
    }
}

export const classes = async(req: Request, res: Response) =>{
    const {classname, trainer, description, time, capacity, id, attendees} = req.body;
    console.log(classname, id)
    try{  
          if(id){
           const result = await Classes.findByPk(id);
        const data = result?.toJSON();
        console.log(data)
    
        if(result){
            const result = await Classes.update({
               classname,
               trainer,
               description,
               time,
               capacity,
               attendees
               
            },{ where:{id: data.id}})
         
            if(result){
                res.status(201).json({success: true, message: "Member updated successfully"})
            }
        }
    }
    else{
        console.log("hello")
        const result = await Classes.create({
            classname,
            trainer,
            description,
            time,
            capacity,
            attendees
        })
        if(result){
            res.status(201).json({success: true, message: 'Class added successfully'});
        }
    }
    }catch(err: unknown){
        if(err instanceof Error){
            res.status(500).json({success: false, error: err.message})
            console.log(err.message)
        }
    }
}
export const getClasses = async(req: Request, res: Response) =>{
    try{
        const result = (await Classes.findAll());
        if(result){
            res.status(201).json({success: true, data: result});
            
        }
    }catch(err: unknown){
        if(err instanceof Error){
            res.send(500).json({success: false, error: err.message});
        }
    }
}

export const deleteClasses = async(req: Request, res: Response) =>{
    try{

        const {id} = req.params;
        const result = await Classes.destroy({where: {id: id}});
        if(result){
            res.status(201).json({success: true, message: 'Classes deleted successfully'});
        }
    }catch(err: unknown){
        if(err instanceof Error){
            res.status(500).json({success: false, error: err.message});
        }
    }
}

export const getPayments = async(req: Request, res: Response) =>{
    try{
        const result = await Payment.findAll();
        
        if(result){
            res.status(201).json({success: true, data: result});
        }
    }catch(err: unknown){
        if(err instanceof Error){
            res.status(500).json({success: false, error: err.message});
        }
    }
}

