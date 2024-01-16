import express from "express"
import { connectDb } from "./Utils/features.js";
import userRouter from "./Routes/userRoutes.js";
import teamRouter from "./Routes/teamRoutes.js";
import taskRouter from "./Routes/taskRoutes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors())
config({
    path:"./config.env"
})

app.use(cookieParser());
app.use(express.json());
connectDb()
app.get("/",(req,res)=>{
res.send("welcome")
})

app.use("/api",userRouter)
app.use(teamRouter)
app.use(taskRouter)

app.listen(3000,()=>{
    console.log("server working")
})