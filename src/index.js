// require('dotenv').config({path:'./env'})  //breaks code constitency
import dotenv from 'dotenv'
import connectDB from './db/index.js';

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    // app.on("error",(error)=>{
    //     console.log("ERROR",error);
    //     throw error})
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err)
})

/*
import express from "express";

const app=express()
//always use async await and try catch while taking to database

;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App islistening on port ${process.env.PORT}`)
        })
        
    } catch (error) {
        console.error("ERROR",error);
        throw err        
    }

})()
*/
