import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
const CartItem = (props) => {
  console.log(props);
  return (
    <>
      <h2>{props.props.name}</h2>
      <img
        src={`${props.props.picture}`}
        style={{ width: "100px", height: "100px" }}
        alt="producto"
      ></img>
      <h3>{props.props.subcategory.subcategory}</h3>
      <h3>{props.props.subcategory.price * props.props.quantity}</h3>
      <select>
        <option value={props.props.quantity}>{props.props.quantity}</option>
      </select>
      <button onClick={() => props.removeProduct(props.props.productId)}>
        X
      </button>
      <button onClick={() => props.modifyQuantity(props.props.productId)}>
        Modificar
      </button>
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
