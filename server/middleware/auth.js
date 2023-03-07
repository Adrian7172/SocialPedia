const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(403).send("Access denied");
        }

        if (token.startsWith("bearer ")) {
            token = token.slice(7);
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET_CODE);

        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



module.exports = verifyToken