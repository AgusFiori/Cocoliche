const express = require('express')
const router = express.Router()
require('../config/passport')
const passport = require('passport')

//CONTROLADORES
const eventController = require('../controllers/eventController')
const productController = require('../controllers/productController')
const categoryController = require('../controllers/categoryController')

// EL METODO PUT LO TENEMOS QUE MOVER A LA RUTA QUE TIENE EL PRODUCT ID
router.route('/products').post(productController.addProduct).get(productController.getProducts).put(productController.editProduct)

router.route('/category').post(categoryController.addCategory).get(categoryController.getCategories)

router.route('/product/:productId').delete(productController.deleteProduct)
const validator = require('../controllers/validator')
const userController = require('../controllers/userController')
const reservationController = require('../controllers/reservationController')
const orderController = require('../controllers/orderController')




//RUTAS DE EVENTOS
router.route('/events')
  .get(eventController.getEvents)
  .post(eventController.addEvent)
  .put(eventController.modifyEvent)
router.route('/events/delete/:id')
  .delete(eventController.deleteEvent)


//RUTAS RESERVAS
router.route('/reservation')
  .post(passport.authenticate('jwt', { session: false }), reservationController.reservation)


//rutas de signIn y signUp
router.route('/user/signup')
  .post(validator.accountToValidate, userController.signUp)
router.route('/user/signin')
  .post(userController.signin)
router.route('/user/ls')
  .post(passport.authenticate('jwt', { session: false }), userController.logFromLS)


  router.route('/user/sign_google')
  .post(userController.signGoogle)
//Rutas de pedidos
router.route('/purchases')
  .post(passport.authenticate('jwt', { session: false }), orderController.newOrder)

module.exports = router