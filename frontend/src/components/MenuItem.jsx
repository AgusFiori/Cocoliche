import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";

const MenuItems = (props) => {
  const [productToAdd, setProductToAdd] = useState({});
  console.log(props);

  useEffect(() => {}, []);

  const { cart } = props;
  const { localStorageCart } = props;

  useEffect(() => {
    if (localStorage.getItem("cart") && cart.length === 0) {
      const parsedCart = JSON.parse(localStorage.getItem("cart"));
      localStorageCart(parsedCart);
      return false;
    } else if (cart.length !== 0) {
      var stringifiedCartItem = JSON.stringify(cart);
      localStorage.setItem("cart", stringifiedCartItem);
    }
  }, [cart, localStorageCart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "subcategory") {
      const newValue = JSON.parse(value);
      setProductToAdd({
        ...productToAdd,
        [name]: newValue,
        productId: props.product._id,
      });
    } else {
      setProductToAdd({
        ...productToAdd,
        [name]: value,
        productId: props.product._id,
        picture: props.product.picture,
        name: props.product.name,
      });
    }
  };

  const addToCart = () => {
    props.addToCart(productToAdd);
  };

  var qty = 1;

  return (
    <div>
      <div>
        <h3>{props.product.name}</h3>
        <img
          src={`${props.product.picture}`}
          alt="Comida"
          style={{ width: "200px" }}
        ></img>
        <select
          name="subcategory"
          defaultValue="default"
          onChange={handleChange}
        >
          <option value="default">Elegi una opcion</option>
          {props.product.subcategories.map((category) => (
            <option
              key={category.category}
              value={JSON.stringify({
                subcategory: category.subcategory,
                price: category.subcategoryPrice,
              })}
            >
              {category.subcategory} --- {category.subcategoryPrice}
            </option>
          ))}
        </select>

        <select name="quantity" onChange={handleChange} defaultValue="default">
          <option value="default">-</option>
          {[...Array(props.product.stock)].map(() => {
            return <option>{qty++}</option>;
          })}
        </select>
        <button onClick={addToCart}>Agregar</button>
        <p>{props.product.description}</p>
        <h4>{props.product.rating.length}⭐</h4>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
  };
};

const mapDispatchToProps = {
  addToCart: cartActions.addToCart,
  localStorageCart: cartActions.localStorageCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
