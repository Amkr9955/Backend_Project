import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))  //for using middlewares

//best security practices

app.use(express.json({limit:"16kb"}))   //for json data usage and receive
app.use(express.urlencoded({extended:true,limit:"16kb"})) //for url data
app.use(express.static("public"))  //for data like images,etc to store in server in file named public
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'

//routes declaration  //use to bring router using middleware since they are in separate files
app.use("/api/v1/users",userRouter)

// http://localhost:8000/api/v1/users/register


export {app}