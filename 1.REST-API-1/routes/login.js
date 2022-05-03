const router = require('express').Router();

const User = require('../models/User.js');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');



router.post('/', (req,res) => {

    // Validate**************************

    const {email, password} = req.body;

    if(!email || !password) {

        return res.status(422).json({error : 'All Feilds Are Required!!'});
    }


    // cheak if user exist*****************


    User.findOne({ email : email }, (err, user) =>  {
        if(err) {
            throw err
        }
        if(user) {

            bcrypt.compare(password, user.password).then((match) =>  {
                if(match) {

                    // JWT TOKEN

                const accessToken = jwt.sign({

                    id : user._id,

                    name : user.name,

                    email : user.email

                },process.env.JWT_TOKEN_SECRET, { expiresIn : '30s' })


                return res.send({
                    accessToken : accessToken,
                    type : 'Bearer'
                })

                }

                return res.status(401).json({error : 'Email Or Password is Wrong!!'})

            }).catch(err => {
                throw err;
            })

        }
        else {
            return response.status(401).json({error : ' Email Or Password is Wrong!'});
        }
    })


})


module.exports = router;