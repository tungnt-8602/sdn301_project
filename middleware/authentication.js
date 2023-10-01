import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token not provided.' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.user = decodedToken;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
};
