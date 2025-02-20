import { sequelize } from '../config/db.js';
import { Users } from '../models/users.model.js';

async function depositBalance(userId, amount) {
    const user = await Users.findByPk(userId);

    if (!user) throw new Error(`Пользователь с id: ${userId} не найден`);

    user.balance += amount;

    await user.save();
    return user.balance;
}

async function withdrawBalance(userId, amount) {
    const t = await sequelize.transaction();
    try {
        const user = await Users.findByPk(userId, {
            transaction: t,
            lock: t.LOCK.UPDATE,
        });

        if (!user) {
            const error = new Error();
            error.data = {
                error: 'error user',
                message: `Пользователь с id: ${userId} не найден`,
            };
            throw error;
        }

        if (user.balance < amount) {
            const error = new Error();
            error.data = {
                error: 'error balance',
                message: `Пользователь не может иметь отрицательный баланс`,
            };
            throw error;
        }

        user.balance -= amount;
        await user.save({ transaction: t });
        await t.commit();
        return user.balance;
    } catch (error) {
        await t.rollback();
        console.error('Transaction failed:', error);
        throw error;
    }
}

export { depositBalance, withdrawBalance };
