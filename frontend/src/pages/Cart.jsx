import React, { useEffect } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import CartItem from "../components/CartItem.jsx";
import { Link } from "react-router-dom";

const Cart = (props) => {
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    props.localStorageCart(localCart);
  }, []);

  const sendCart = () => {
    props.confirmPurchase({ cart: props.cart, token: props.loggedUser.token });
  };

  let acc = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return (
    <div className="container">
      <h2>Cart</h2>
      {props.cart && props.cart.length ? (
        <>
          {" "}
          {props.cart && props.cart.map((item) => <CartItem props={item} />)}
          {props.cart.map((item) => {
            acc.push(item.subcategory.price * item.subcategory.qty);
          })}
          <h5>{acc.length && acc.reduce(reducer)}</h5>
          <button onClick={sendCart}>Confirmar Compra</button>
        </>
      ) : (
        <Link to="/menu">
          <h4>Agrega algun producto a tu carrito !</h4>
        </Link>
      )}
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
