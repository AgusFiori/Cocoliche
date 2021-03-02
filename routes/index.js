const express = require('express')
const router = express.Router()
const validator = require('../controllers/validator')
const userController=require('../controllers/userController')





router.route('/user/signup')
.post( validator.accountToValidate,userController.signUp)


module.exports = router