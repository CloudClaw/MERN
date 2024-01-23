import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { registrationValidator, loginValidator } from './validations/auth.js';
import { postCreateValidator } from './validations/post.js';

import { UserController, PostController } from './controllers/index.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';

mongoose
    .connect('mongodb+srv://Artem:12345@cluster0.zj3d5xr.mongodb.net/blog')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB Error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //Функция возвращает путь
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname); // Как назвается файл
    },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json()); //Позволяет читать json, приходящий в запросе с клиента
app.use('/uploads', express.static('uploads')); //Достаем картинку, если открыть путь в браузере. GET-запрос на получение статичного файла

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`, //Возвращаем на клиент путь на котором сохранена картинка
    });
}); // Создаем роут для получения картинок и объясняем, что ждем 1 картинку

app.post('/login', loginValidator, handleValidationErrors, UserController.login);
app.post('/registration', handleValidationErrors, registrationValidator, UserController.register);
app.get('/me', checkAuth, UserController.getMe);

app.get('/tags', PostController.getLastTags);

app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidator, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidator, handleValidationErrors, PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});
