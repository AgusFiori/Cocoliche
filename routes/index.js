const express = require('express')
const router = express.Router()
// require('../config/passport')
// const passport = require('passport')

<<<<<<< HEAD
// const productController = require('../controllers/productController')

// router.route('/addProduct').post(productController.addProduct)
=======
const productController = require('../controllers/productController')

router.route('/products/addProduct').post(productController.addProduct)
>>>>>>> 33809c93c845b00a20d034f89ca89af81e9fdc72



module.exports = router