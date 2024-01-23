import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        title: {
            //Если передаем объект - даем понять, что сущность обязательна к заполнению
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
            unique: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, // id в базе имеет выглядит как отдельный тип
            ref: 'User', // По id выше cсылается на модель User и достает нужного пользователя
            required: true,
        },
        imageUrl: String,
    },
    {
        timestamps: true, //База автоматически подставляет дату создания и обновления сущности
    },
);

export default mongoose.model('Post', PostSchema);
