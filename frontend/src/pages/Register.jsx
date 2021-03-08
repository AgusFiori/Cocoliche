import { connect } from "react-redux";
import { useState } from "react";
import authActions from "../redux/actions/authActions.jsx";
import Navbar from "../components/Navbar";
import firebase from 'firebase'

const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [errores,setErrores]=useState([])
  const validateUser = (e) => {
    const inputValue = e.target.value;
    const field = e.target.name;
    setUser({
      ...user,
      [field]: inputValue,
    });
  };

  const createUser = async (e) => {
    e.preventDefault();
    if (
      user.username === "" ||
      user.password === "" ||
      user.firstname === "" ||
      user.lastname === "" 
    ) {
      alert("Completa todos los campos");
      return false;
    }
    const respuesta = await props.newUser(user)
    if(respuesta && !respuesta.success){
        setErrores(respuesta.response.details)
    }
  };
  const loginWithRS = async e => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const dates = await firebase.auth().signInWithPopup(provider)
    props.loginWithGoogle(dates.user)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-2 col-xl-2 p-0">
          <Navbar />
        </div>
        <div className="trasparent col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-auto my-auto d-flex flex-column text-center border py-4">
          <span className="h1">Registrate</span>
          <input
            className='text-center my-3 h3'
            placeholder="Ingresa tu Nombre"
            name="firstname"
            onChange={validateUser}
          ></input>
          <input
            className='text-center h3'
            placeholder="Ingresa tu Apellido"
            name="lastname"
            onChange={validateUser}
          ></input>
          <input
            className='text-center my-3 h3'
            placeholder="Ingresa tu Email"
            name="username"
            onChange={validateUser}
          ></input>
          <input
            className='text-center h3'
            placeholder="Ingresa tu contraseña"
            type="password"
            name="password"
            onChange={validateUser}
          ></input>
          <button onClick={createUser} className='h3 my-3'>Crear Cuenta</button>
          <button onClick={loginWithRS} className='h3'>Ingresar con Google</button>
          {errores.map(error=><label>{error.message}</label>)}
        </div>
      </div>
    </div>

  );
};
const mapStateToProps = (state) => {
  return {
    loggedUser: state.authReducer.loggedUser,
  };
};
const mapDispatchToProps = {
  newUser: authActions.newUser,
  loginWithGoogle: authActions.loginWithGoogle
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
