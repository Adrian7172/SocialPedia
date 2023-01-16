const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) =>{
    try {
        let token = req.headers.authorization;
        if(!token){
            res.status(403).send("Access denied");
        }
        
        if(token.startsWith("Bearer ")){
            token = token.slice(7).trimLeft();
        }
        //throw err if not match
        const verified = jwt.verify(token, process.env.JWT_SECRET_CODE);
        
        // if(!verified){
        //     res.status(403).send("Access denied");
        // }

        req.user = verified;
        next();
        
    } catch (err) {
        res.status(505).json({error: err.message});
    }
}


module.exports = verifyToken