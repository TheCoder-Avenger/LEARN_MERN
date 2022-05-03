const router = require('express').Router();

const auth = require('../middlewares/auth.js');

const User = require('../models/User.js');


router.get('/', auth ,  (req,res)=>  {

    User.findOne({ email : req.user.email }).select('-password').exec((err, user) => {
        
        if(err) {
            throw err;
        }

        res.send(user);

    });

})




module.exports = router;