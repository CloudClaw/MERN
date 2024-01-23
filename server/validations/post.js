import validator from 'express-validator';

const { body } = validator;

export const postCreateValidator = [
    body('title', 'Неверный заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 10 }).isString(),
    body('tags', 'Неверный формат тегов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
