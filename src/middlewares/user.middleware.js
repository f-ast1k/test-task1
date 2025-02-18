import { body } from 'express-validator';
const balanceValidation = [
    body('userId')
        .isInt({ min: 1 })
        .withMessage('Неверно указан id пользователя'),
    body('amount')
        .isFloat({ min: 0.01 })
        .withMessage('Сумма должна быть положительным числом'),
];

export { balanceValidation };
