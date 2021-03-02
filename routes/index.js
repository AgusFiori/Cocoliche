const express = require('express')
const router = express.Router()

//CONTROLADORES
const eventController = require('../controllers/eventController')



//RUTAS DE EVENTOS
router.route('/events')
.get(eventController.getEvents)
.post(eventController.addEvent)




router.route('/user')

module.exports = router