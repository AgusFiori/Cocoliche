import { useState } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import { RiShoppingCart2Line } from "react-icons/ri";

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
      <h3>${" "}{props.sub.subcategoryPrice}</h3>
      <label htmlFor={props.sub._id}>Cantidad</label>
        <select
          id={props.sub._id}
          name="subcategory"
          onChange={handleChange}
          defaultValue="default"
        >
          <option value="default">0</option>
          {[...Array(10)].map(()=> {
            return (
              <option
                value={JSON.stringify({
                  subcategory: props.sub.subcategory,
                  price: props.sub.subcategoryPrice,
                  subcategoryId: props.sub._id,
                  qty,
                  stock: props.sub.subcategoryStock,
                })}
              >
                {qty++}
              </option>
            );
          })}
        </select>
        <RiShoppingCart2Line className="addCart" onClick={addToCart} />
      </>
  );
};

const mapDispatchToProps = {
  addToCart: cartActions.addToCart,
};

export default connect(null, mapDispatchToProps)(SubCategory);
