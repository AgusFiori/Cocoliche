import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import SubCategory from "./SubCategory.jsx";

const MenuItems = (props) => {
  const { cart } = props;
  const { localStorageCart } = props;

  // useEffect(() => {
  //   if (localStorage.getItem("cart") && cart.length === 0) {
  //     const parsedCart = JSON.parse(localStorage.getItem("cart"));
  //     localStorageCart(parsedCart);
  //     return false;
  //   } else if (cart.length !== 0) {
  //     var stringifiedCartItem = JSON.stringify(cart);
  //     localStorage.setItem("cart", stringifiedCartItem);
  //     return false;
  //   }
  // }, [localStorageCart]);

  return (
    <div>
      <div>
        <h3>{props.product.name}</h3>
        <img
          src={`${props.product.picture}`}
          alt="Comida"
          style={{ width: "200px" }}
        ></img>
        {props.product.subcategories.map((sub) => (
          <SubCategory sub={sub} picture={props.product.picture} />
        ))}
        {/* <button onClick={addToCart}>Agregar</button> */}
        <p>{props.product.description}</p>
        <h4>{props.product.rating.length}⭐</h4>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     cart: state.cartReducer.cart,
//   };
// };

const mapDispatchToProps = {
  addToCart: cartActions.addToCart,
  localStorageCart: cartActions.localStorageCart,
};

export default connect(null, mapDispatchToProps)(MenuItems);
