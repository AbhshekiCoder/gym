"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseConnected_1 = require("../config/DatabaseConnected");
const User = DatabaseConnected_1.sequelize.define("User", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "user"
    }
});
exports.default = User;
