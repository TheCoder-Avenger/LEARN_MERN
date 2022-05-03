const jwt = require('jsonwebtoken');


function auth(req,res,next) {

    let authHeader = req.headers.authorization.split('Bearer ')[1];

    if(authHeader) {

        let token = authHeader;
        
        jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user)=> {
            if(err) {
                return res.sendStatus(403);
            }

            req.user = user;

            next();

        })

    }

    else {
        res.sendStatus(401);
    }

    

}


module.exports = auth;