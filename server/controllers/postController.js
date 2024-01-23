import PostModel from '../models/post.js';

export const create = async (req, res) => {
    try {
        const postDoc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        });

        const post = await postDoc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec(); //Связываем с таблицей user и выполняем
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось вывести статьи',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.findOneAndUpdate(
            {
                _id: postId, // Находим статью по id
            },
            {
                $inc: { viewsount: 1 }, // При открытие статьи, хотим увеличить просмотр на 1
            },
            {
                returnDocument: 'after', // После обновления хотим вернуть актуальный документ
            },
        )
            .populate('user')
            .then((postDoc) => {
                if (!postDoc) {
                    //Проверяем есть ли статья
                    return res.status(404).json({
                        message: 'Статья не найдена',
                    });
                }

                res.json(postDoc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалось вернуть статью',
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось вывести статьи',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.findOneAndDelete({
            _id: postId,
        })
            .then((postDoc) => {
                if (!postDoc) {
                    return res.status(404).json({
                        message: 'Статья не найдена',
                    });
                }

                res.json({
                    success: true,
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: 'Не удалось удалить статью',
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось вывести статьи',
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags.split(','),
            },
        );

        res.json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось обновить статью',
        });
    }
};

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts
            .map((obj) => obj.tags)
            .flat()
            .slice(0, 5);

        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось вывести теги',
        });
    }
};
