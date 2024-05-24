const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    githubId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profileVisibility: {
        type: DataTypes.STRING,
        defaultValue: 'public'
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    }
});

module.exports = User;
