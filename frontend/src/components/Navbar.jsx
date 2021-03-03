import React from "react";
import {IoFastFoodOutline} from 'react-icons/io5'

const Navbar = () => {
  return (
      <div className="nav-coco d-flex flex-column">
          <div className="logo m-5">
            Logo
          </div>
          <div className="menu">
            <h3>Login</h3>
            <h3>Register</h3>
            <h3>MI pedido <IoFastFoodOutline/> </h3>
            <h3>Menu</h3>
            <h3>Eventos</h3>
            <h3>Servicios</h3>
            <h3>Sobre Nosotros</h3>
            <h3>Contacto</h3>
          </div>
      </div>
  );
};

export default Navbar;


