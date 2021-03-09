import React, { useEffect } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import CartItem from "../components/CartItem.jsx";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";


const Cart = (props) => {
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    props.localStorageCart(localCart);
  }, []);

  let acc = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const history = useHistory();

  const goToPay = () => {
    let path = `/confirm`;
    history.push(path);
  };

  return (
    <div className="container-fluid d-flex p-0 menu-responsive">
    <Navbar />
    <div className="container">
      <h1>Carrito</h1>
      {props.cart && props.cart.length ? (
        <div className="container">
          {" "}
          {props.cart && props.cart.map((item) => <CartItem props={item} />)}
          {props.cart.map((item) => {
            acc.push(item.subcategory.price * item.subcategory.qty);
          })}
          <div className="p-4 mt-5 d-flex justify-content-between border border-dark rounded">
            <p class="h1">TOTAL:</p>
            <p class="h1">{acc.length && acc.reduce(reducer)}</p>
          </div>
          <div className="container-fluid d-flex justify-content-center p-3">
            <button
              type="button"
              class="btn btn-primary p-2 pr-5 pl-5"
              style={{ fontSize: "32px" }}
              onClick={goToPay}
            >
              Continuar
            </button>
          </div>
        </div>
      ) : (
        <Link to="/menu">
          <h4>Agrega algun producto a tu carrito !</h4>
        </Link>
      )}
    </div>
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
