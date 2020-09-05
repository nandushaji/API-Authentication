const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const authRoute = require('./routes/auth');
const dotenv = require('dotenv');
const postRoute = require('./post');
const connectDB = require('./config/db');
dotenv.config({path:'./config/config.env'});


connectDB();
 
//middleware

app.use(express.json());


//route middleware
app.use('/api/user',authRoute);
app.use('/api/post',postRoute);

app.listen(PORT , ()=>{
    console.log('Up and Running');
})