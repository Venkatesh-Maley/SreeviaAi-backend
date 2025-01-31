const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectRoutes = require('./routers/connect.router');
const authRouter = require('./routers/auth.router')

const app = express()

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("DataBase connected successfully")
    })
    .catch(err =>{
        console.log(err);
    });

app.use('/api', connectRoutes);
app.use('/api/auth',authRouter);
    
app.get('/',(req,res)=>{
    res.json({message:"Server running successfully"});
})
app.listen(process.env.PORT, ()=>{
    console.log('Listening...')
})