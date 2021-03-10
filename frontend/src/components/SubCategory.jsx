import { useState } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import { RiShoppingCart2Line } from "react-icons/ri";

const SubCategory = (props) => {
  const [productToAdd, setProductToAdd] = useState({
    picture: props.picture,
    productId: props.sub._id,
    name: props.sub.subcategory,
    subcategory: {
      price: props.sub.subcategoryPrice,
      qty: 1,
      stock: props.sub.subcategoryStock,
      subcategory: props.sub.subcategory,
      subcategoryId: props.sub._id,
    },
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
    console.log(productToAdd);
    // props.addToCart(productToAdd);
  };

  return (
    <div className="d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-around mt-2">
          <h3>${" "}{props.sub.subcategoryPrice}</h3>
          <div>
            <label htmlFor={props.sub._id} className="h5">Cantidad:{" "}</label>
              <select
                id={props.sub._id}
                name="subcategory"
                onChange={handleChange}
                defaultValue="default"
                className="menuCardBodyTextSelectCantidad px-4"
              >
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
            </div>
        </div>
        <span className="addCart">
          Agregar al Carrito<RiShoppingCart2Line  onClick={addToCart} />
        </span>
      </div>
  );
};

const mapDispatchToProps = {
  addToCart: cartActions.addToCart,
};

export default connect(null, mapDispatchToProps)(SubCategory);
