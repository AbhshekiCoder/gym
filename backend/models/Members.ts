import { DataTypes } from 'sequelize';
import { sequelize } from '../config/DatabaseConnected';



const Member = sequelize.define('members',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    plan:{
        type: DataTypes.STRING,
        allowNull: false

    },
    membership:{
        type: DataTypes.STRING,
        allowNull: false
    },
    joined:{
        type: DataTypes.DATE,
        allowNull: false

    }
})

export default Member;