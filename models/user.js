const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const UserModel = sequelize.define('User', {
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
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    photoUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profileVisibility: {
        type: DataTypes.STRING,
        defaultValue: 'public'
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }
});

module.exports = UserModel;
