import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import cartActions from "../redux/actions/cartActions";

const ConfirmPurchase = (props) => {
  const [data, setData] = useState({ tip: 25 });

  let parsedCart = JSON.parse(localStorage.getItem("cart"));

  let acc = 0;

  parsedCart &&
    parsedCart.map(
      (item) => (acc += item.subcategory.price * item.subcategory.qty)
    );

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const sendCart = () => {
    props.confirmPurchase({
      cart: props.cart,
      data,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
      user: {
        name: props.loggedUser.firstname,
        token: props.loggedUser.token,
        urlPic: props.loggedUser.urlPic,
      },
    });
  };

  return (
    <div className="container p-5">
      <form>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Segurola y Habana 4310"
            onChange={handleChange}
          ></input>
        </div>
        <div class="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="+54 9 11 1111 1111"
            onChange={handleChange}
          ></input>
        </div>
        <p className="h5">Propina</p>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="tip"
            id="0"
            value={0}
            onChange={handleChange}
          ></input>
          <label class="form-check-label" htmlFor="inlineRadio1">
            $0
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="tip"
            id="25"
            value={25}
            defaultChecked={true}
            onChange={handleChange}
          ></input>
          <label class="form-check-label" htmlFor="inlineRadio2">
            $25
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="tip"
            id="50"
            value={50}
            onChange={handleChange}
          ></input>
          <label class="form-check-label" htmlFor="inlineRadio2">
            $50
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="tip"
            id="100"
            value={100}
            onChange={handleChange}
          ></input>
          <label class="form-check-label" htmlFor="inlineRadio2">
            $100
          </label>
        </div>
        <div className="form-group">
          <label for="notes">Notas acerca del pedido</label>
          <textarea
            class="form-control"
            id="notes"
            rows="3"
            name="orderNotes"
            placeholder="Sin lechuga/con ketchup..."
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label for="notes">Notas acerca del domicilio</label>
          <textarea
            class="form-control"
            id="notes"
            rows="3"
            name="addressNotes"
            placeholder="Primer piso/rejas negras..."
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
      <div className="container">
        <p>
          ${acc} + (Propina: ${data.tip})
        </p>
        <p className="h1">TOTAL: ${acc + parseInt(data.tip)}</p>
        <p className="h5">- Medios de pago van acá -</p>
      </div>
      <div className="container d-flex justify-content-around">
        <button onClick={goBack} type="button" className="btn-danger">
          Atrás
        </button>
        <button onClick={sendCart} type="button" className="btn-success">
          Confirmar pedido
        </button>
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
  confirmPurchase: cartActions.confirmPurchase,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPurchase);
