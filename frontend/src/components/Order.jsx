import React, { useEffect } from "react";
import { connect } from "react-redux";
import orderActions from "../redux/actions/orderActions";
import axios from "axios";
import { API } from "./Api";
import Swal from "sweetalert2";

const Order = (props) => {
  const confirmOrder = () => {
    props.confirmOrder({
      orderId: props.order._id,
      customerId: props.order.customer,
    });
  };
  const cancelOrder = () => {
    props.cancelOrder(props.order._id);
  };
  const completeOrder = () => {
    props.completeOrder(props.order._id);
  };
  const getCustomerData = async () => {
    const response = await axios.get(
      `${API}/purchases/user/${props.order.customer}`
    );
    Swal.fire({
      title:
        response.data.response.firstname +
        " " +
        response.data.response.lastname,
      text: "Telefono:",
      imageUrl: response.data.response.urlPic,
      imageWidth: 100,
      imageAlt: "Custom image",
    });
  };
  useEffect(() => {
    props.getOrders();
  }, []);

  // console.log(props.order.cart.cart.map((item) => item));
  return (
    <>
      <td>
        {props.order.cart.cart.map((item) => (
          <p>
            {item.name} {item.subcategory.subcategory} x{item.subcategory.qty}
          </p>
        ))}
      </td>
      <td>{props.order.state}</td>
      <td>
        {props.order.date.slice(5, 10)} {props.order.date.slice(11, 16)}
      </td>
      <td>
        <button onClick={confirmOrder}>Confirmar</button>
        <button onClick={cancelOrder}>Cancelar</button>
        <button onClick={completeOrder}>Completar</button>
        <button onClick={getCustomerData}>Datos</button>
      </td>
    </>
  );
};

const mapDispatchToProps = {
  confirmOrder: orderActions.confirmOrder,
  cancelOrder: orderActions.cancelOrder,
  completeOrder: orderActions.completeOrder,
  getOrders: orderActions.getOrders,
};

export default connect(null, mapDispatchToProps)(Order);
