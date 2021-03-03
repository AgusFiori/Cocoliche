import { connect } from 'react-redux'
import {useState} from 'react'
import authActions from '../redux/actions/authActions'
import GoogleLogin from 'react-google-login'



const Register =(props)=>{
 const [users, setUsers]=useState({
    username: '', 
    password:'', 
    firstname:'',
    lastname:'',
    urlPic:'',
 })
 const [errores,setErrores]=useState([])
 const validateUser=e=>{
     const inputValue= e.target.value
     const field=e.target.name
     setUsers({
         ...users,
         [field]:inputValue
     })
 }



const createUser=async e=>{
    e.preventDefault()
    if(users.username === '' || users.password ==='' || users.firstname===''|| users.lastname === ''||users.urlPic===''){
        alert('fill in all fields')
        return false
    }
    const respuesta = await props.newUser(users)
    if(respuesta && !respuesta.success){
        setErrores(respuesta.response.details)
    }
}

const responseGoogle = async (response) => {
    if(response.error){
      alert ('invalid account')
    }else{
      //podemos crear el nuevo usuario con google con la action 
      const respuesta = await props.newUser({
        username: response.profileObj.email,
        urlPic: response.profileObj.imageUrl,
        password: response.profileObj.googleId,
        firstname: response.profileObj.givenName,
        lastname: response.profileObj.familyName
      })
      if(respuesta && !respuesta.success){
        setErrores(respuesta.respuesta)
       }
    }
  }



console.log(errores)
    return(
         <div>
             <h1>Create Account</h1>
             <input placeholder="write your email"  name="username" onChange={validateUser}></input>
             <input placeholder="write your password" type="password" name="password" onChange={validateUser}></input>
             <input placeholder="write your name" name="firstname" onChange={validateUser}></input>
             <input placeholder="write your lastname" 
            name="lastname" onChange={validateUser}></input>
             <input placeholder="put your user photo" name="urlPic" onChange={validateUser}></input>
             <button onClick={createUser}>Create Account</button>
             <GoogleLogin
               clientId="581401226209-scr1fncegbbivf7eds0g088i1ks51ihh.apps.googleusercontent.com"
               buttonText="Crear Account with Google"
               onSuccess={responseGoogle}
               onFailure={responseGoogle}
               cookiePolicy={'single_host_origin'}
            />
            {errores.map(error=><lbale>{error.message}</lbale>)}
         </div>
    )
}

const mapDispatchToProps={
  newUser:authActions.newUser
}
export default connect (null, mapDispatchToProps) (Register)