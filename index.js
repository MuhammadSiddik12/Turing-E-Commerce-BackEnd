const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./dbConnect/connection')
const router = require('./routes/routes')

app.use(express.json())
app.use('/',router)

app.listen(process.env.PORT,()=>console.log(`Server is Running on port ${process.env.PORT}`))