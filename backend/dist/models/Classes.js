"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseConnected_1 = require("../config/DatabaseConnected");
const Classes = DatabaseConnected_1.sequelize.define("classes", {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    classname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    trainer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    attendees: {
        type: sequelize_1.DataTypes.INTEGER,
    }
});
exports.default = Classes;
