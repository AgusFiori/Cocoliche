const express = require('express')
const router = express.Router()

const eventController = require('../controllers/eventController')


router.route('/events')
.get(eventController.getEvents)
.put(eventController.editEvent)


module.exports = router