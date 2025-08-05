import { DataTypes } from "sequelize";
import { sequelize } from "../config/DatabaseConnected";



const Classes = sequelize.define("classes", {
    id:{
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true

    },
    classname:{
        type: DataTypes.STRING,
        allowNull: false

    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    trainer:{
        type: DataTypes.STRING,
        allowNull: false
    },
    time:{
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    attendees:{
        type: DataTypes.INTEGER,

        
    }
})

export default Classes;