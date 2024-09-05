import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MySQL database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});


export default sequelize;
