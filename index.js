import express from 'express';
import dotenv from 'dotenv';
import chalk from "chalk";
import userRoute from './routes/user.route.js'
import connectDB from './DB/db.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import Messagerouter from './routes/message.route.js';
import cors from 'cors'
import {app, server} from './Socket.io/socket.js'




app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())


// //connectDB help to connect database
// connectDB();

let isConnected = false;

async function connectToMongoDb() {
  //connectDB help to connect database
connectDB();
isConnected=true;
}



//user api 
app.use('/api/v1/user',userRoute)
//message route api
app.use('/api/v1/message',Messagerouter)

//middleware
app.use(errorMiddleware)

// //connect port to run server
// const PORT = process.env.PORT || 5008;
// server.listen(PORT,()=>{
//     console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
    
// })

export default app;