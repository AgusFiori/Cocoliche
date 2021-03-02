const express = require('express')
const router = express.Router()
// require('../config/passport')
// const passport = require('passport')

const productController = require('../controllers/productController')

router.route('/products/addProduct').post(productController.addProduct)



module.exports = router