import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Users = sequelize.define(
    'users',
    {
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
            },
        },
    },
    {
        validate: {
            checkBalance() {
                if (this.balance < 0) {
                    throw new Error('Balance не может быть отрицательным');
                }
            },
        },
    }
);
export { Users };
