require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000 || process.env.PORT
const mongoose = require('mongoose')
const users = require("./userModal")


// db connection
mongoose.connect(process.env.DB).then(()=>{
    console.log("Db is connected");
}).catch(error=>{
    console.log("Connection error",error);
})

// Middlewares
app.use(express.json())
app.use(cors())


// Routes
app.get('/',(req,res)=>{
    res.status(200).json("Server running")
})
app.post('/register', async (req,res)=>{
    const {firstName,
        lastName,
        email,
        address,
        mobile,
        password,
        dateOfBirth,
        course,
        gender,} = req.body
    try{
        const user = new users({
            firstName,
            lastName,
            email,
            address,
            mobile,
            password,
            dateOfBirth,
            course,
            gender,
        })
        await user.save()
        res.status(200).json(user)
    }catch (error){
        res.status(500).json("Exisiting Email !!!")
    }
    
})

app.get('/users', async (req,res)=>{
    try{
        const allUsers =  await users.find()
        res.status(200).json(allUsers)

    }catch(error){
        res.status(500).json(error)

    }
})



app.listen(PORT,()=>{
    console.log("Server is Running at Port ");
})