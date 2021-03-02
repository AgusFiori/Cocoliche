const express = require('express')
require ('dotenv').config()
const app = express()
require('./config/database')
const cors = require('cors')
const router = require('./routes/index')


app.use(cors())
app.use(express.json())
app.use('/api', router)
//const port=process.env.PORT 
//const host=process.env.HOST 
app.listen(4000,console.log('app listening on port 4000'))



