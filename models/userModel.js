import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import logger from '../config/logger.js'; // Import the logger

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

// Sequelize Hooks for logging database actions
User.afterCreate((user, options) => {
    logger.info(`User created: ID=${user.id}, Username=${user.username}`);
});

User.afterUpdate((user, options) => {
    logger.info(`User updated: ID=${user.id}, Username=${user.username}`);
});

User.afterDestroy((user, options) => {
    logger.info(`User deleted: ID=${user.id}, Username=${user.username}`);
});

export default User;
