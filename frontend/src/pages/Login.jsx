import { connect } from 'react-redux'
import {useState} from 'react'
import authActions from '../redux/actions/authActions'
import GoogleLogin from 'react-google-login'



const Login =(props)=>{
 const [users, setUsers]=useState({
    username: '', 
    password:''
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
    if(users.username === '' || users.password ===''){
        alert('fill in all fields')
        return false
    }
    const respuesta = await props.newUser(users)
    if(respuesta && !respuesta.success){
        setErrores(respuesta.respuesta)
    }
}

const responseGoogle = async (response) => {
    if(response.error){
      alert ('invalid account')
    }else{
      //podemos crear el nuevo usuario con google con la action 
      const respuesta = await props.loginUser({
        username: response.profileObj.email,
        password: response.profileObj.googleId
      })
      if(respuesta && !respuesta.success){
        setErrores(respuesta.respuesta)
       }
    }
  }

    return(
         <div>
             <h1>Log in</h1>
             <input placeholder="write your email"  name="username" onChange={validateUser}></input>
             <input placeholder="write your password" type="password" name="password" onChange={validateUser}></input>
             <button onClick={createUser}>Create Account</button>
             <label>{errores}</label>
             <GoogleLogin
               clientId="581401226209-scr1fncegbbivf7eds0g088i1ks51ihh.apps.googleusercontent.com"
               buttonText="Crear Account with Google"
               onSuccess={responseGoogle}
               onFailure={responseGoogle}
               cookiePolicy={'single_host_origin'}
            />
         </div>
    )
}

const mapDispatchToProps={
  loginUser:authActions.loginUser
}
export default connect (null, mapDispatchToProps) (Login)
