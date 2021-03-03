const express = require('express')
const router = express.Router()
// require('../config/passport')
// const passport = require('passport')

const productController = require('../controllers/productController')

router.route('/products').post(productController.addProduct).put(productController.editProduct)

router.route('/product/:productId').get(productController.deleteProduct)

module.exports = router