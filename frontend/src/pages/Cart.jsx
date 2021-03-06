import React, { useEffect } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import CartItem from "../components/CartItem.jsx";

const Cart = (props) => {
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    props.localStorageCart(localCart);
  }, []);

  const sendCart = () => {
    props.confirmPurchase({ cart: props.cart, token: props.loggedUser.token });
  };

  console.log(props);

  return (
    <div>
      <h2>Cart</h2>
      {props.cart && props.cart.map((item) => <CartItem props={item} />)}
      <button onClick={sendCart}>Confirmar Compra</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    loggedUser: state.authReducer.loggedUser,
  };
};

const mapDispatchToProps = {
  localStorageCart: cartActions.localStorageCart,
  confirmPurchase: cartActions.confirmPurchase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
