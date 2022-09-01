const path =require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan=require('morgan');
const connectDB=require('./config/db');
const cors=require('cors');
dotenv.config({path:'./config/config.env'}); 
const users=require("./routes/user");

connectDB();

const bookings = require("./routes/homeservices");
const app=express();

app.use(cors())
app.use(express.json());
//to allow body parser

app.use('/api/v1/signup',users);
app.use('/api/v1/login',users);
app.use('/api/v1/services',bookings);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'client','build','index.html')));
}
const PORT=process.env.PORT||5000;
 
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

