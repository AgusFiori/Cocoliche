const user = require ('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userController ={
    signUp: async (req, res)=>{
        console.log(req.body)
        const errores=[]
        const {username, password, firstname,lastname,urlPic, role, purchases, date }= req.body

        const existingUser= await user.findOne({username:username})
        if(existingUser){
            errores.push('existing user, choose another')
        } 
        if(errores.length===0){
           const passHasheado = bcrypt.hashSync(password, 10)
           const validatedUser=new user({
               username, password:passHasheado, firstname, lastname, urlPic, role, purchases, date
           })
           var userValidation=validatedUser.save()
           var token = jwt.sign({...userValidation}, process.env.SECRET_KEY, {} )
        }
        return res.json({success:errores.length ===0 ? true : false,
            respuesta: errores,
            //validamos que no tenga errores para mandarle los datos 
            response:errores.length === 0 && {token, urlPic: userValidation.urlPic, username: userValidation.username}})
    }
}

module.exports=userController