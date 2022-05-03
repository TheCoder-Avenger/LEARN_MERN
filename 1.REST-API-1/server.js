// .env Files

require('dotenv').config();


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

const articlesRoutes =  require('./routes/articles.js');

const registerRoutes = require('./routes/register.js');

const loginRoute = require('./routes/login.js');

const userRoutes = require('./routes/user.js');

const refreshRoutes = require('./routes/refresh.js');

const logoutRoute = require('./routes/logout.js');



app.use('/api/articles', articlesRoutes);

app.use('/api/register', registerRoutes);

app.use('/api/login', loginRoute);

app.use('/api/user', userRoutes);

app.use('/api/refresh', refreshRoutes);

app.use('/api/logout', logoutRoute);



// Listening On The Port

app.listen(PORT, ()=>  {
    console.log(`Listening on the port ${PORT}`);
});

