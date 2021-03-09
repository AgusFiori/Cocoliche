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
  setReservated(reservations.filter(reservation => reservation.customer._id === props.loggedUser._id && reservation))
}, [reservations])

  return (
    <div>
      <h2>Tu perfil</h2> 
      <span>Tus reservas</span>
      {reservated.length ?
       reservated.map(res => {
        return( !res.info &&
            <div>
              <PendingReservations _id={res._id} day={res.day} quantity={res.quantity} />
            </div>
        )      
      })
      :
      <span>No tienes reservas</span>
      }
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