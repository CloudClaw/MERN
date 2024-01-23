import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/user.js';

export const register = async (req, res) => {
    try {
        

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(password, salt);

        const userData = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatar,
            passwordHash: passHash,
        });

        const user = await userData.save();

        const token = jwt.sign(
            {
                _id: user._id, //Шифруем к примеру id, что бы проверять есть ли в базе при автризации
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userInfo } = user._doc;

        res.json({
            ...userInfo,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash); // Проверяем сходится ли пароль

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id, //Шифруем к примеру id, что бы проверять есть ли в базе при автризации
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const { passwordHash, ...userInfo } = user._doc;

        res.json({
            ...userInfo,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const { passwordHash, ...userInfo } = user._doc;

        res.json({
            ...userInfo,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};
