import React, { useState } from "react";
import { NavLink} from "react-router-dom";
import authActions from '../redux/actions/authActions'
import {IoFastFoodOutline} from 'react-icons/io5'
import { GoSignOut } from "react-icons/go";
import { connect } from 'react-redux'
import logo from '../assets/cocoliche-logo.png'
import Swal from 'sweetalert2';

const Navbar = (props) => {

  const [diaReserva, setDiaReserva] = useState("")

  const [nroReserva, setNumeroReserva] = useState("")

  const reservar = e => {
    Swal.fire({
      confirmButtonText: "RESERVAR",
      showCancelButton: true,
      cancelButtonText: "CERRAR",
      title: 'Multiple inputs',

      html:
        '<span>Ingrese la fecha de su reserva</span>'+
        '<input type="date" id="swal-input1" class="swal2-input">' +
        '<span>Cantidada de sillas a reservar</span>'+
        '<input type="number" id="swal-input2" class="swal2-input">',
      focusConfirm: true,  
      preConfirm: () => {
        return [
          setDiaReserva(document.getElementById('swal-input1').value),
          setNumeroReserva(document.getElementById('swal-input2').value)
        ]
      }
    })
    .then((result) => {
      console.log(nroReserva, diaReserva)
      result.dismiss &&      
      (nroReserva !== "" && diaReserva !== "") ? 
        Swal.fire('Reserva enviada, recibirá un mail con la confirmación!', '', 'success') : 
        Swal.fire('Complete todos los campos', '', 'error')
  })
  }
  
  if (props.loggedUser === null) {
    var links = <>
          <NavLink to="/login" className="text-decoration-none m-2">
            <span className="h4" >Ingresar</span>
          </NavLink>
          <NavLink to="/register" className="text-decoration-none m-2">
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
            <NavLink to="/admin" className="text-decoration-none m-2">
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
      <div className="d-flex flex-column">
          <div className="logo mt-4 mb-2" style={{backgroundImage: `url(${logo})`}}>
          </div>
          <div className="menu mx-auto d-flex flex-column">
            {links}           
            <NavLink to="/menu" className="text-decoration-none m-2">
              <span className="h4">Menú</span>
            </NavLink>
            <NavLink to="/cart" className="text-decoration-none m-2">
              <span className="h4 d-flex align-items-center">Mi pedido <IoFastFoodOutline/></span>
            </NavLink>
            <NavLink to="/calendar" className="text-decoration-none m-2">
              <span className="h4">Eventos</span>
            </NavLink>
            <NavLink to="/contact" className="text-decoration-none m-2">
              <span className="h4">Contacto</span>
            </NavLink>
            {props.loggedUser && 
            <NavLink  className="text-decoration-none m-2" to="/">
              <span className="h4" onClick={reservar}>HACER UNA RESERVA</span>
            </NavLink>}
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


