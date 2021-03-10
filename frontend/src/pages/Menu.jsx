import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuItem from "../components/MenuItem";
import Preloader from '../components/Preloader'
import productActions from "../redux/actions/productActions";
import cartActions from "../redux/actions/cartActions";
import Navbar from "../components/Navbar";
import fondo1 from '../assets/fondos/fondo-1.jpg'

const Menu = (props) => {
  const { getProducts, getCart } = props;
  const [preloader, setPreloader]= useState(false)

 useEffect(() => {
    fetch()
  }, []);

  async function fetch () {
    await getProducts();
    getProducts();
    setPreloader(true)
 }
  return (
    <div className="container-fluid d-flex p-0 menu-responsive calendar-fondo" style={{backgroundImage: `url(${fondo1})`}}>
      <Navbar />
        {preloader?
          <>
      <div className="container pl-5">
        <div className="container-fluid trasparent">
        <h2 className="text-center mt-3">Hoy Cocina Cocoliche</h2>
        <h4 className="text-center">Conocé nuestras especialidades</h4>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <h2 className="px-2 py-4">Filtros</h2>
          <select>
            <option>Precio ascendente</option>
            <option>Precio descendente</option>
            <option>Popularidad</option>
          </select>
        </div>
        <div className="col-12">
          <div className="row ">
            {props.allProducts.map((product) => (
              <MenuItem key={product._id} product={product} />
            ))}
          </div>
        </div>
        </div>

</div>        

        </>
        :
            <Preloader/>}
          
          </div>  
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.productR.allProducts,
  };
};

const mapDispatchToProps = {
  getCart: cartActions.getCart,
  getProducts: productActions.getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
