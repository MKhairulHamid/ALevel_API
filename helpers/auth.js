const jwt = require ('jsonwebtoken');

module.export = {
    auth : (req, res, next) => {
        if(req.method !=='OPTIONS'){
            jwt.verify(req.token, "botolminum", (error, decoded) =>{
                if (error) {
                    return res.status(401).send({ message: "User not authorized.", error: "User not authorized."})
                }
                req.user = decoded;
                next();
            })
        } else {
            next();
        }
    }
}