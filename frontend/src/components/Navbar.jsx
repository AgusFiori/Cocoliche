import React, { useState } from "react";
import { Link, NavLink} from "react-router-dom";
import authActions from '../redux/actions/authActions'
import { GoSignOut } from "react-icons/go";
import { connect } from 'react-redux'
import logo from '../assets/cocoliche-logo.png'
import blackboard from '../assets/blackboard.jpg'
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import BurgerMenu from "./BurgerMenu";

const Navbar = (props) => { 
  if (props.loggedUser === null) {
    var links = <>
          <NavLink to="/login" className="text-decoration-none">
            <p className="h4 color-white" >Ingresar</p>
          </NavLink>
          <NavLink to="/register" className="text-decoration-none">
            <p className="h4 color-white">Registrarse</p>
          </NavLink>
    </>
} else {
    if (props.loggedUser.role === "admin") {
        var links = <>
            <div className="d-flex justify-content-between">
              <NavLink to={'/cart'} className="text-decoration-none">
                <div className="container-fluid p-0 d-flex justify-content-between">
                  <img src={props.loggedUser.urlPic} alt="profile" className="userImg" />
                  <p className="h4 color-white">{props.loggedUser.firstname}</p>
                </div>
              </NavLink>
            </div>
            <NavLink to="/admin" className="text-decoration-none">
                <p className="h4 color-white">Administracion</p>
            </NavLink>
        </>
    } else {
        var links =
            <>
             <NavLink to={'/profile'} className="text-decoration-none mt-2">
              <div className="container d-flex justify-content-between">
                <img src={props.loggedUser.urlPic} alt="profile" className="userImg" />
                <p className="h4 color-white">{props.loggedUser.firstname}</p>
              </div>
            </NavLink>
            </> }
    }
  return (
    <>
    <div className="navBar-width" style={{backgroundImage: `url(${blackboard})`}}>
        <div className="menu position-fixed" style={{backgroundImage: `url(${blackboard})`}}>
          <NavLink to="/" className="text-decoration-none">
            <div className="logo mt-3" style={{backgroundImage: `url(${logo})`}}>
            </div>
          </NavLink>
          <div className="nav-buttons">
            {links}
            <NavLink to="/menu" className="text-decoration-none">
              <p className="h4 color-white">Menú</p>
            </NavLink>
            <NavLink to="/cart" className="text-decoration-none mt-2 d-flex">
              <p className="h4 color-white d-flex align-items-center">Mi pedido</p> 
            </NavLink>
            <NavLink to="/calendar" className="text-decoration-none">
              <p className="h4 color-white">Eventos</p>
            </NavLink>
            <NavLink to="/contact" className="text-decoration-none">
              <p className="h4 color-white">Contacto</p>
            </NavLink>
            <NavLink to="/reservation" className="text-decoration-none">
              <p className="h4 color-white">HACER UNA RESERVA</p>
            </NavLink>
            {props.loggedUser&&
            <NavLink to="/" className="text-decoration-none bg-light">
              <p className="h4 color-white" className="logOut" onClick={() => props.logoutUser()} >
                <GoSignOut />Cerrar Sesión
              </p>
          </NavLink>}
         </div>
          <div className="mt-3 d-flex justify-content-around">
            <Link>
                <AiFillFacebook className="rd"></AiFillFacebook>
            </Link>
            <Link>
                <AiFillInstagram className="rd"></AiFillInstagram>
            </Link>
          </div>
        </div>
    </div>
    <BurgerMenu props={props}/>

    </>
  );
};

const mapStateToProps = state => {
  return {
      loggedUser: state.authReducer.loggedUser
  }
}

const mapDispatchToProps = {
  logoutUser: authActions.logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)


