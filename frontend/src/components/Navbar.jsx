import React, { useState } from "react";
import { Link, NavLink} from "react-router-dom";
import authActions from '../redux/actions/authActions'
import {IoFastFoodOutline} from 'react-icons/io5'
import { GoSignOut } from "react-icons/go";
import { connect } from 'react-redux'
import logo from '../assets/cocoliche-logo.png'
import blackboard from '../assets/blackboard.jpg'
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";


import Swal from 'sweetalert2';

const Navbar = (props) => {

  
  if (props.loggedUser === null) {
    var links = <>
          <NavLink to="/login" className="text-decoration-none mt-2">
            <span className="h4" >Ingresar</span>
          </NavLink>
          <NavLink to="/register" className="text-decoration-none mt-2">
            <span className="h4">Registrarse</span>
          </NavLink>
    </>
} else {
    if (props.loggedUser.role === "admin") {
        var links = <>
            <NavLink to={'/cart'} className="text-decoration-none mt-2">
              <div className="container d-flex justify-content-between">
                <img src={props.loggedUser.urlPic} alt="profile" className="userImg" />
                <span className="h5">Hola {props.loggedUser.firstname}</span>
              </div>
            </NavLink>
            <NavLink to="/">
                <GoSignOut className="logOut" onClick={() => props.logoutUser()} />
            </NavLink>
            <NavLink to="/admin" className="text-decoration-none mt-2">
                <span className="h4">Administracion</span>
            </NavLink>
        </>
    } else {
        var links =
            <>
             <NavLink to={'/profile'} className="text-decoration-none mt-2">
              <div className="container d-flex justify-content-between">
                <img src={props.loggedUser.urlPic} alt="profile" className="userImg" />
                <span className="h5">Hola {props.loggedUser.firstname}</span>
              </div>
            </NavLink>
            <NavLink to="/">
                <GoSignOut className="logOut" onClick={() => props.logoutUser()} />
            </NavLink>
           
            </> }
    }
  return (
      <div className="d-flex flex-column nav-coco " style={{backgroundImage: `url(${blackboard})`}}>
          <NavLink to="/" className="text-decoration-none">
            <div className="logo mt-4 mb-2" style={{backgroundImage: `url(${logo})`}}>
            </div>
          </NavLink>
          <div className="menu d-flex flex-column mx-auto">
            {links}
            <NavLink to="/menu" className="text-decoration-none mt-2">
              <span className="h4">Menú</span>
            </NavLink>
            <NavLink to="/cart" className="text-decoration-none mt-2 d-flex">
              <span className="h4 d-flex align-items-center">Mi pedido</span> <IoFastFoodOutline className="cartIcono"/>
            </NavLink>
            <NavLink to="/calendar" className="text-decoration-none mt-2">
              <span className="h4">Eventos</span>
            </NavLink>
            <NavLink to="/contact" className="text-decoration-none mt-2">
              <span className="h4">Contacto</span>
            </NavLink>
            <NavLink  className="text-decoration-none mt-2" to="/reservation">
              <span className="h4">HACER UNA RESERVA</span>
            </NavLink>
            <div className="mt-3 d-flex justify-content-around">
            <Link>
              <p>
                <AiFillFacebook className="rd"></AiFillFacebook>
              </p>
            </Link>
            <Link>
              <p>
                <AiFillInstagram className="rd"></AiFillInstagram>
              </p>
            </Link>

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
  logoutUser: authActions.logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)


