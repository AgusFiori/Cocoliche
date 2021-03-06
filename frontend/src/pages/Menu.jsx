import React, { useEffect } from "react";
import { connect } from "react-redux";
import MenuItem from "../components/MenuItem";
import productActions from "../redux/actions/productActions";
import cartActions from "../redux/actions/cartActions";

const Menu = (props) => {
  const { getProducts } = props;

  useEffect(() => {
    getProducts();
    props.getCart();
  }, [getProducts]);

  return (
    <div>
      <div>
        <h2>Filtros</h2>
        <select>
          <option>Precio ascendente</option>
          <option>Precio descendente</option>
          <option>Popularidad</option>
        </select>
      </div>
      <div>
        <h2>Menu</h2>

        {props.allProducts.map((product) => (
          <MenuItem key={product._id} product={product} />
        ))}
      </div>
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
