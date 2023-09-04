const jwt = require('jsonwebtoken');


module.exports = async  function verify (req, res, next) {
    const token = await req.header('auth-token');
    console.log(token)

    if(!token) return res.status(400).json('Access Denied');

    try{
        const verify =  jwt.verify(token, process.env.TOKEN);
        res.user = verify; 
        next();
    }catch(err){
        res.status(400).json('Invalid Token')
    } 
}
