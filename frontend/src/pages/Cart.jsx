import React, { useEffect } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import CartItem from "../components/CartItem.jsx";

const Cart = (props) => {
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    props.localStorageCart(localCart);
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      {props.cart && props.cart.map((item) => <CartItem props={item} />)}
      <button>Comprar</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
  };
};

const mapDispatchToProps = {
  localStorageCart: cartActions.localStorageCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
