const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    timezone: DataTypes.STRING,
});

module.exports = { Contact };

