const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const connectRouter = require('./routers/connectRouter'); 

const app = express()
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("DataBase connected successfully")
    })
    .catch(err =>{
        console.log(err);
    });

app.use('/api/connect', connectRouter);


app.get('/',(req,res)=>{
    res.json({message:"Server running successfully"});
})
app.listen(process.env.PORT, ()=>{
    console.log('Listening...')
})