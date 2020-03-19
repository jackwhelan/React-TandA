const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        var decoded = jwt.verify(
            req.headers.authorization,
            process.env.SECRET_KEY
        );
        req.userData = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};