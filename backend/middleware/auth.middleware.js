const UserModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");



async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Please Login First"});
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);

        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({message:"Invalid token"});
    }
    
}

module.exports = {
    authUserMiddleware
}
