import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            //Если передаем объект - даем понять, что сущность обязательна к заполнению
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: String,
    },
    {
        timestamps: true, //База автоматически подставляет дату создания и обновления сущности
    },
);

export default mongoose.model('User', UserSchema);
