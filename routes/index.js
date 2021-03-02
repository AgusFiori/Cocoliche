const express = require('express')
const router = express.Router()
// require('../config/passport')
// const passport = require('passport')

const productController = require('../controllers/productController')

// EL METODO PUT LO TENEMOS QUE MOVER A LA RUTA QUE TIENE EL PRODUCT ID
router.route('/products').post(productController.addProduct).get(productController.getProducts).put(productController.editProduct)

router.route('/product/:productId').delete(productController.deleteProduct)

module.exports = router