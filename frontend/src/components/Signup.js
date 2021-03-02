import {useState} from 'react'
const Signup =()=>{
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
console.log(users)


const createUser=e=>{
    e.preventDefault()
    if(users.username === '' || users.password ==='' || users.firstname===''|| users.lastname === ''||users.urlPic===''){
        alert('fill in all fields')
    }else{
        alert('exitoso')
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

export default Signup