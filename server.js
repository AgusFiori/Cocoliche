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
<<<<<<< HEAD

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'))
    })
}
const port = process.env.PORT
const host = process.env.HOST || '0.0.0.0'

app.listen(port, host, () => console.log(`App listening on port ${port}`))
=======
app.listen(4000,()=>console.log("App listening on port 4000"));
>>>>>>> a8b59e66b6a97d9c832192a79fa6c49725c3120d
