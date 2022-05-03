// Import Express Router And All Files

const router = require('express').Router();

const req = require('express/lib/request');
const Article = require('../models/Article.js');


//****** All Routes *****//


//****/ Create Routes  //****/

router.post('/', async (req,res) =>  {

    const {title, body , author } = req.body;

    const article = new Article({

        // title : req.body.title,
        // body : req.body.body,
        // author : req.body.author 

        title,
        body,
        author

    });


    //****// To Save Using Callback //*****/


    // article.save( (err, document) => {
    //     if(err) {
    //         throw err;
    //     }
        
    //     res.status(201).json(document);

    // });


    //*****// To Save Using Then Catch  //*****//

    // article.save().then((document) => {
    //     res.status(201).json(document);

    // }).catch((err) => {
    //     throw err
    // });   


    //****// To Save Using Async Await  //****//

    try {

    const document = await article.save();

    return res.status(201).json(document);

    } catch(err) {

        throw err;
    }

})


//****/ Get Single Routes  //****/
 
router.get('/:id' , (req,res) =>  {

    const { id } =  req.params;

    Article.findOne({ _id : id }, (err, document) => {
        if(err) {
            throw err;
        }
        if(document) {

            return res.json(document);

        }
        else {
            return res.status(404).json({ error : 'Article Not Found!!!' });
        }
    })

})


//*****/ To Update The Single Request //*****/

router.patch('/:id', (req,res) =>  {

    const {id} = req.params;

    const {title, body, author} = req.body;

    Article.findOne({_id : id}, (err, document) => {
        if(err) {
            throw err;
        }
        if(document) {

            Article.updateOne({_id : id},
                {
                    title,
                    body,
                    author
                }).then(() => {
                    return res.json(req.body)
                }).catch((err) => {
                    throw err;
                })

        }
        else {
            return res.status(404).json({error : 'Article Not Found!!!'})
        }
    });

})


//****/  To Get The All Routes  //*****/

router.get('/', (req,res)=>  {
    Article .find((err,articles) => {
        if(err) {
            throw err;
        }

        return res.json(articles);
    })
})


//***/ To Delete Request  //****/

router.delete('/:_id' , (req,res) =>  {

    const {_id} = req.params

    Article.deleteOne({ _id }).then(()=> {

        return res.json({ deletedId : _id });
    }).catch((err) => {
        return res.status(500).json({ error : 'Something Wents Wrong!!!' });
    })
})

module.exports = router;