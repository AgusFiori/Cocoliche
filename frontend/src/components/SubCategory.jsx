import { useState } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";

const SubCategory = (props) => {
  const [productToAdd, setProductToAdd] = useState({
    picture: props.picture,
    productId: props.sub._id,
    name: props.sub.subcategory,
  });

  let qty = 1;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = JSON.parse(value);
    setProductToAdd({
      ...productToAdd,
      [name]: newValue,
      name: props.name,
    });
  };

  const addToCart = () => {
    props.addToCart(productToAdd);
  };

  
  return (
    <>
      <h3>{props.sub.subcategory}</h3>
      <h3>{props.sub.subcategoryPrice}</h3>
      <select name="subcategory" onChange={handleChange} defaultValue="default">
        <option value="default">Elegi cantidad</option>
        
      </select>
      <button onClick={addToCart}>Agregar</button>
    </>
  );
};

const mapDispatchToProps = {
  addToCart: cartActions.addToCart,
};

export default connect(null, mapDispatchToProps)(SubCategory);
