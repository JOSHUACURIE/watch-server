const express=require('express');
const dotenv=require('dotenv/config')
const app= express();
const conectDb=require('./config/db')


conectDb();
app.use(express.json());

//my routes
const authRoutes=require('./route/auth.routes');

app.use('/api/v1/health',(req,res)=>{
    console.log("Health endpoint touched")
    res.send("it is live");
    res.status(200).json({
        success:true,
        message:"Server is live"
    })
})

app.user('/api/v1/auth',authRoutes);

const PORT=process.env.PORT;


app.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
})