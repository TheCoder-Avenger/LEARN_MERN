// Import ALl Required Files

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;


// Database Connection

const url = "mongodb+srv://jay123:jay123@rest-apis-1.wqdel.mongodb.net/REST-APIS-1?retryWrites=true&w=majority";

mongoose.connect(url).then(()=> {
    console.log('Database Connected!!!');

}).catch(()=> {
    console.log('Database Not Connected!!!');

});


// Middleware

app.use(express.json());


// Router

const articlesRoutes =  require('./routes/articles');

app.use('/api/articles', articlesRoutes);


// Listening On The Port

app.listen(PORT, ()=>  {
    console.log(`Listening on the port ${PORT}`);
});

