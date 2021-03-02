const express = require('express')
const router = express.Router()
const validator = require('../controllers/validator')
const userController=require('../controllers/userController')
const passport = require('passport')
require('../config/passport')




//rutas de signIn y signUp
router.route('/user/signup')
.post( validator.accountToValidate,userController.signUp)
router.route('/user/signin')
.get(userController.signIn)
router.route('/user/ls')
.post(passport.authenticate('jwt', {session: false}), userController.logFromLS)

module.exports = router