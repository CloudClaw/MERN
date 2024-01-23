import validator from 'express-validator';

const { body } = validator;

export const registrationValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть не менее 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка').optional().isURL(),
];

export const loginValidator = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть не менее 5 символов').isLength({ min: 5 }),
];
