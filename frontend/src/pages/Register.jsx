import { connect } from 'react-redux'
import {useState} from 'react'
import authActions from '../redux/actions/authActions'
const Register =(props)=>{
 const [users, setUsers]=useState({
    username: '', 
    password:'', 
    firstname:'',
    lastname:'',
    urlPic:'',
 })
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
    if(respuesta && respuesta.success){
      console.log(respuesta)
    }
}

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
         </div>
        
    )
}
const mapStateToProps = state => {
    return {
        loggedUser: state.authReducer.loggedUser
    }
}
const mapDispatchToProps={
  newUser:authActions.newUser
}
export default connect (mapStateToProps, mapDispatchToProps) (Register)