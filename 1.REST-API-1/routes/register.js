const router = require('express').Router();

const User = require('../models/User.js');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Refresh = require('../models/Refresh.js');



router.post('/', (req,res) =>  {

    // Authorize

    // Validate**************************

    const {name, email, password} = req.body;

    if(!name || !email || !password) {

        return res.status(422).json({error : 'All Feilds Are Required!!'});
    }


    // cheak if user exist*****************

    User.exists({ email : email }, async (err, result)=> {
        if(err) {
            return res.status(500).json({error : 'Something Wents Wrong'});
        }

        if(result)  {
            return res.status(422).json({error : 'Result WIth This Email Already Exist!!!'});
        }

        else {
            // Hash The Password

            const hashPassword = await bcrypt.hash(password, 10);

            const user = new User({
                name,

                email,
                
                password : hashPassword
            });

            user.save().then((user) => {

                // JWT TOKEN

                const accessToken = jwt.sign({
                    id : user._id,

                    name : user.name,

                    email : user.email

                },process.env.JWT_TOKEN_SECRET, { expiresIn : '30s' });


                // REFRESH TOKEN

                const refreshToken = jwt.sign({
                    id : user._id,

                    name : user.name,

                    email : user.email

                }, process.env.JWT_REFRESH_SECRET);


                // REFRESH TOKEN SAVE IN THE DATABASE

                const refreshTokenDocument = new Refresh({
                        
                    token :  refreshToken

                })

                refreshTokenDocument.save().then((doc)=> {

                    // RETURN BOTH TOKENS

                return res.send({

                    accessToken : accessToken,

                    refreshToken : refreshToken,

                    type : 'Bearer'
                })


                  });


            }).catch(err =>  {

                return res.status(500).send({ error : 'Something Went Wrong!!!' })
            })

        }

    })

    
})


module.exports = router;