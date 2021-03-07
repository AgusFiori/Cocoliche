import { connect } from "react-redux";
import { useState } from "react";
import authActions from "../redux/actions/authActions";
import Navbar from "../components/Navbar.jsx";
import blackboard from "../assets/blackboard.jpg";
import firebase from 'firebase'

const Login = (props) => {
  const [users, setUsers] = useState({
    username: "",
    password: "",
  });
  const [errores, setErrores] = useState([]);

  const validateUser = (e) => {
    const inputValue = e.target.value;
    const field = e.target.name;
    setUsers({
      ...users,
      [field]: inputValue,
    });
  };

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


  const loginWithRS = async e => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const dates = await firebase.auth().signInWithPopup(provider)
    props.loginWithGoogle(dates.user)
  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-sm-12 col-md-3 col-lg-2 col-xl-2 position-sticky nav-coco"
          style={{ backgroundImage: `url(${blackboard})` }}
        >
          <Navbar />
        </div>
        <div className="trasparent col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-auto my-auto d-flex flex-column text-center border ">
          <span className="h1">Ingresar</span>
          <input
            className="text-center h3"
            placeholder="Ingresa tu email"
            name="username"
            onChange={validateUser}
          ></input>
          <input
            className="text-center my-4 h3"
            placeholder="Ingresa tu contraseña"
            type="password"
            name="password"
            onChange={validateUser}
          ></input>
          <button onClick={login} className="h3">
            Ingresar
          </button>
          <label>{errores}</label>
          <button onClick={loginWithRS}>Ingresar con otros métodos</button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  loginUser: authActions.loginUser,
  loginWithGoogle: authActions.loginWithGoogle,
};

export default connect(null, mapDispatchToProps)(Login);
