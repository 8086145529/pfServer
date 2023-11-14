// Loads .env file contents into process.env variable by default.By this way we can access the contents in the .env file whereever we wants using the process.env variable.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')
// Create an Express application
const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
const PORT = 4000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Project Fair Server started at port: ${PORT} and waiting for client requests!!!`);
})

// http get request resolving to http://localhost:4000/
pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project Fair Server Started and waiting for client requests!!!!</h1>`)
})


// pfServer.put('/',(req,res)=>{
//     res.send(`PUT Request`)
// })

// pfServer.post('/',(req,res)=>{
//     res.send(`POST Request`)
// })