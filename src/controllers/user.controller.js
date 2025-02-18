import { validationResult } from 'express-validator';
import * as userService from '../services/user.service.js';

async function depositBalance(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, amount } = req.body;

    if (!userId || !amount)
        return res
            .status(400)
            .json({ message: '`userId` и `amount` являются обязательными.' });
    if (typeof userId !== 'number' || userId <= 0 || !Number.isInteger(userId))
        return res
            .status(400)
            .json({ message: 'Параметр `userId` должен являться числом' });
    if (typeof amount !== 'number' || amount <= 0)
        return res
            .status(400)
            .json({ message: 'Параметр `amount` должен являться числом' });

    try {
        const balance = await userService.depositBalance(userId, amount);
        return res
            .status(200)
            .json({ message: 'Баланс успешно изменен', balance: balance });
    } catch (error) {
        console.log(`Deposit error: ${error}`);
        return res.status(500).json({ message: 'Ошибка пополнения баланса.' });
    }
}
var errorCount = 0;
async function withdrawBalance(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, amount } = req.body;

    if (!userId || !amount)
        return res
            .status(400)
            .json({ message: '`userId` и `amount` являются обязательными.' });
    if (typeof userId !== 'number' || userId <= 0 || !Number.isInteger(userId))
        return res
            .status(400)
            .json({ message: 'Параметр `userId` должен являться числом' });
    if (typeof amount !== 'number' || amount <= 0)
        return res
            .status(400)
            .json({ message: 'Параметр `amount` должен являться числом' });

    try {
        const balance = await userService.withdrawBalance(userId, amount);
        return res
            .status(200)
            .json({ message: 'Баланс успешно изменен', balance: balance });
    } catch (error) {
        const errorData = error.data;
        if (errorData.error === 'error balance' || 'error user') {
            return res.status(400).json({ message: errorData.message });
        }
        return res.status(500).json({ message: 'Ошибка снятия с баланса.' });
    }
}

export { depositBalance, withdrawBalance };
