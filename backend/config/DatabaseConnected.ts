import { Sequelize } from "sequelize";
import dotenv from 'dotenv';


dotenv.config()



export const sequelize = new Sequelize(
    process.env.DB_URL as string,
    {
        dialect: 'postgres',
        logging: false,

    }

)

export const connectDB = async () =>{
    try{
        await sequelize.authenticate();
        console.log("connected to database")
    }catch(err ){
        console.log(err);
    }
}