import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import PendingReservations from "../components/PendingReservations";
import reservationActions from '../redux/actions/reservationActions';

const Profile = (props) => {

  const [reservated, setReservated] = useState({})
  const {reservations} = props

  useEffect(() => {
    props.getReservations()
  }, [])

useEffect(() => {
  setReservated( reservations.length > 0 && reservations.filter(reservation => reservation.customer._id === props.loggedUser._id && reservation))
}, [reservations])

console.log(props.loggedUser.purchases.map(purch => purch.cart.map(name => name)))
console.log(props.loggedUser.purchases)
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 text-center mx-auto">
          <h2>Tu perfil</h2> 
          <div> 
            <span>Tus reservas</span>
            {reservated.length ?
            reservated.map(res => {
              return( !res.info &&
                  <div key={res._id}>
                    <PendingReservations _id={res._id} day={res.day} quantity={res.quantity} />
                  </div>
                )}) :
            <p>No tienes reservas</p>}
          </div>    
          <div>Tus compras</div>
          <p>{}</p>
        </div>     
      </div>     
    </div>
  );
};


const mapStateToProps = state => {
  return {
    loggedUser: state.authReducer.loggedUser,
    reservations: state.reservationsR.reservations,
    cart: state.cartReducer.cart
  }
}

const mapDispatchToProps = {
  getReservations: reservationActions.getReservations
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)