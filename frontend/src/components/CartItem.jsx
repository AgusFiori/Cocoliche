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
    setVisible(!visible);
  };

  let qty = 1;

  return (
    <div>
      <div className="container-fluid p-3 d-flex align-items-center">
        <img
          src={`${props.props.picture}`}
          style={{ width: "100px", height: "100px" }}
          className="rounded-circle mr-3"
          alt="producto"
        ></img>
        <p className="h1">
          {props.props.name} {props.props.subcategory.subcategory}
        </p>
      </div>
      <div className="d-flex p-3 align-items-center">
        {visible ? (
          <div class="container d-flex">
            <p className="h1">x</p>
            <div className="pr-3 d-flex justify-content-between w-25">
              <select
                className="form-select pr-5"
                name="quantity"
                style={{ fontSize: "36px" }}
                onChange={changeQuantity}
                defaultValue="default"
              >
                <option value="default">{props.props.subcategory.qty}</option>
                {[...Array(20)].map(() => {
                  return <option>{qty++}</option>;
                })}
              </select>
              <button
                type="button"
                class="btn btn-success pl-3 pr-3"
                onClick={confirmChanges}
              >
                Confirmar
              </button>
            </div>
          </div>
        ) : (
          <div className="container">
            <p className="h1">x{props.props.subcategory.qty}</p>
          </div>
        )}
        <div className="ml-3 d-flex w-25 justify-content-around">
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => setVisible(!visible)}
          >
            Modificar
          </button>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() =>
              props.removeProduct(props.props.subcategory.subcategoryId)
            }
          >
            X
          </button>
        </div>
      </div>
      <div className="p-3 mt-1 mb-1 border-top d-flex justify-content-between">
        <p className="h3">Subtotal: </p>
        <p className="h3">
          {props.props.subcategory.price * props.props.subcategory.qty}
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  // modificar cantidad
  modifyQuantity: cartActions.modifyQuantity,
  // eliminar del carrito
  removeProduct: cartActions.removeProduct,
};

export default connect(null, mapDispatchToProps)(CartItem);
