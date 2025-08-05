"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DatabaseConnected_1 = require("../config/DatabaseConnected");
const Member = DatabaseConnected_1.sequelize.define('members', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    plan: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    membership: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    joined: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
});
exports.default = Member;
