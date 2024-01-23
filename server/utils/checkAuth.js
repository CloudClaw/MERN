import jwt from 'jsonwebtoken';

export default (req, res, next) => { // Делаем middleware для расшифровки токена
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, '');

    if(token) {
        try {
            const decodedToken = jwt.verify(token, 'secret123');

            req.userId = decodedToken._id //Так как шифровали мы id

            next(); // Для того что бы действие перешло от middleware к запросу
        } catch (error) {
            res.status(403).json({
                message: 'Нет доступа'
            })
        }

    } else {
        return res.status(403).json({
            message: 'Нет доступа'
        })
    }
} 