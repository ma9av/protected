import express from "express";
import dotenv from 'dotenv'
import { getUserInfo, loginUser, registerUser } from "./userService.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'


dotenv.config()

const app = express();
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:['GET', 'POST', 'DELETE', 'PUT']
}
))

app.use(express.json())

app.use(cookieParser())

function authenticateUser(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null){
        return res.sendStatus(401)
    }    
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if (err) {
                return res.sendStatus(403)
            }
                req.user = user
                next()
        })
        
}


app.post('/register', registerUser)
app.post('/login',loginUser )
app.get('/userdata',authenticateUser,getUserInfo)

app.listen(process.env.PORT,()=>{
    console.log("listening on port " + process.env.PORT);
})