const express = require('express')
const path = require('path')
require('dotenv').config()
const cors = require('cors')
const router = require('./routes/index.js')
require('./config/database')
const fileUpload = require('express-fileupload')

const app = express()
//Middlewares
//Me traduce las peticiones de json a objeto para poder cargarlos a la database

app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use('/api', router)

const port = process.env.PORT
const host = process.env.HOST || '0.0.0.0'

<<<<<<< HEAD
app.listen(4000, () => console.log(`App listening on port 4000`))
=======

app.listen(4000, () => console.log("App listening on port 4000"));
>>>>>>> 7569c3afcb33a530a7e6786810d371d1c0013b99
