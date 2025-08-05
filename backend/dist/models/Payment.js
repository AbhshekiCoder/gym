"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseConnected_1 = require("../config/DatabaseConnected");
const Payment = DatabaseConnected_1.sequelize.define('payment', {
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
        allowNull: false
    },
    plan: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.default = Payment;
