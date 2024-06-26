const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('./../models/user')



async function isLogined( req , res , next){
    const token = req.header('x-auth-token');
    if (!token) res.status(401).send('access denied.');
    try{
        const decoded = jwt.verify(token , config.get('jwt_key'));
        const user = await decoded.findById(decoded._id);
        req.user = user;
        next();
    }
    catch(ex){
        res.status(400).send('invalid token'); 
    }

}



module.exports = { isLogined };