import { useState } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
const CartItem = (props) => {
  const [visible, setVisible] = useState(false);
  const [newQuantity, setNewQuantity] = useState();

  const changeQuantity = (e) => {
    setNewQuantity(e.target.value);
  };

  const confirmChanges = () => {
    props.modifyQuantity(newQuantity, props.props.subcategory.subcategoryId);
  };

  console.log(props);

  let qty = 1;
  return (
    <>
      <h2>
        {props.props.name} {props.props.subcategory.subcategory}
      </h2>
      <img
        src={`${props.props.picture}`}
        style={{ width: "100px", height: "100px" }}
        alt="producto"
      ></img>
      <h3>Subtotal: {props.props.subcategory.price * props.props.quantity}</h3>
      <h3>Cantidad: </h3>
      {visible ? (
        <>
          <select
            name="quantity"
            onChange={changeQuantity}
            defaultValue="default"
          >
            <option value="default">-</option>
            {[...Array(props.props.stock)].map(() => {
              return <option>{qty++}</option>;
            })}
          </select>
          <button onClick={confirmChanges}>Confirmar</button>
        </>
      ) : (
        <h3>{props.props.quantity}</h3>
      )}

      <button
        onClick={() =>
          props.removeProduct(props.props.subcategory.subcategoryId)
        }
      >
        X
      </button>
      <button onClick={() => setVisible(!visible)}>Modificar</button>
    </>
  );
};

const mapDispatchToProps = {
  // modificar cantidad
  modifyQuantity: cartActions.modifyQuantity,
  // eliminar del carrito
  removeProduct: cartActions.removeProduct,
};

export default connect(null, mapDispatchToProps)(CartItem);
