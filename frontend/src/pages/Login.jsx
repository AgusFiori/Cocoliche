import React, { useState } from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import blackboard from '../assets/blackboard.jpg'
import authActions from "../redux/actions/authActions";
import GoogleLogin from 'react-google-login'

const Login = (props) => {
  const [users, setUsers] = useState({
    username: "",
    password: "",
  });

  const [errores, setErrores] = useState();

  const validateUser = (e) => {
    const inputValue = e.target.value;
    const field = e.target.name;
    setUsers({
      ...users,
      [field]: inputValue,
    });
  };
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
  const login = async (e) => {
    e.preventDefault();
    if (users.username === "" || users.password === "") {
      alert("fill in all fields");
      return false;
    }
    const respuesta = await props.loginUser(users);
    if (respuesta && !respuesta.success) {
      setErrores(respuesta.respuesta);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2 position-sticky nav-coco" style={{backgroundImage: `url(${blackboard})`}}>
          <Navbar />
        </div>
        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-auto my-auto d-flex flex-column text-center border ">
            <span className="h1">Ingresar</span>
            <input
              className='text-center h3'
              placeholder="Ingresa tu email"
              name="username"
              onChange={validateUser}
            ></input>
            <input
              className='text-center my-4 h3'
              placeholder="Ingresa tu contraseña"
              type="password"
              name="password"
              onChange={validateUser}
            ></input>
            <button onClick={login} className='h3'>Ingresar</button>
            <label>{errores}</label>
            <GoogleLogin
         clientId="581401226209-scr1fncegbbivf7eds0g088i1ks51ihh.apps.googleusercontent.com"
         buttonText="Crear Account with Google"
         onSuccess={responseGoogle}
         onFailure={responseGoogle}
         cookiePolicy={'single_host_origin'}
      />
        </div>
      </div>
    </div>
    
  );
};
const mapStateToProps = state => {
  return {
      loggedUser: state.authReducer.loggedUser
  }
}
const mapDispatchToProps = {
  loginUser: authActions.loginUser,
  newUser: authActions.newUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
