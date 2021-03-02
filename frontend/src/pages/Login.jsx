import React, {useState} from "react";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";

const Login = (props) => {
  const [users, setUsers]=useState({
    username: '', 
    password:''
 })

 const [errores, setErrores]=useState({})

 const validateUser=e=>{
     const inputValue= e.target.value
     const field=e.target.name
     setUsers({
         ...users,
         [field]:inputValue
     })
 }
 console.log(users)
 
 const login=async e =>{
  e.preventDefault()
    if(users.username === '' || users.password ===''){
        alert('fill in all fields')
        return false
    }
    const respuesta = await props.loginUser(users)
    if(respuesta && !respuesta.success){
      setErrores(respuesta.respuesta)
    }
 }
console.log(errores)

  return (
    <div>
      <h2>Login</h2>
      <input placeholder='write your email' name="username" onChange={validateUser}></input>
      <input placeholder='write your password'  type="password" name="password" onChange={validateUser}></input>
      <button onClick={login}>Log In</button>
      <label>{errores}</label>
    </div>
  )
}

const mapDispatchToProps ={
  loginUser: authActions.loginUser
}
export default connect (null, mapDispatchToProps) (Login)
