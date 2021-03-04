import React from "react";
import { NavLink} from "react-router-dom";
import authActions from '../redux/actions/authActions'
import {IoFastFoodOutline} from 'react-icons/io5'
import { GoSignOut } from "react-icons/go";
import { connect } from 'react-redux'
import logo from '../assets/cocoliche-logo.png'
import blackboard from '../assets/blackboard.jpg'



const Navbar = (props) => {
  if (props.loggedUser === null) {
    var links = <>
          <NavLink to="/login" className="text-decoration-none">
            <span className="h4" >Ingresar</span>
          </NavLink>
          <NavLink to="/register" className="text-decoration-none">
            <span className="h4">Registrarse</span>
          </NavLink>
    </>
} else {
    if (props.loggedUser.role === "admin") {
        var links = <>
            <NavLink to={'/cart'} className="text-decoration-none">
              <div className="container d-flex justify-content-between">
                <img src={props.loggedUser.urlPic} alt="profile" className="userImg" />
                <span className="h5">Hola {props.loggedUser.firstname}</span>
              </div>
            </NavLink>
            <NavLink to="/">
                <GoSignOut className="logOut" onClick={() => props.logoutUser()} />
            </NavLink>
            <NavLink to="/admin" className="text-decoration-none">
                <span className="h4">Administracion</span>
            </NavLink>
        </>
    } else {
        var links =
            <>
             <NavLink to={'/cart'} className="text-decoration-none">
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
      <div className="d-flex flex-column position-fixed nav-coco" style={{backgroundImage: `url(${blackboard})`}}>
          <div className="logo mt-4 mb-2" style={{backgroundImage: `url(${logo})`}}>
          </div>
          <div className="menu d-flex flex-column">
            {links}
            <NavLink to="/menu" className="text-decoration-none">
              <span className="h4">Menú</span>
            </NavLink>
            <NavLink to="/cart" className="text-decoration-none">
              <span className="h4 d-flex align-items-center">Mi pedido <IoFastFoodOutline/></span>
            </NavLink>
            <NavLink to="/calendar" className="text-decoration-none">
              <span className="h4">Eventos</span>
            </NavLink>
            <NavLink to="/contact" className="text-decoration-none">
              <span className="h4">Contacto</span>
            </NavLink>
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


