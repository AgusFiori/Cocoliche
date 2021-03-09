import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import reservationActions from './../redux/actions/reservationActions';

const Profile = (props) => {

  const [reservated, setReservated] = useState({})
  const {reservations} = props

  useEffect(() => {
    props.getReservations()
  }, [])

useEffect(() => {
  setReservated(reservations.map(reservation => reservation.customer._id === props.loggedUser._id && reservation))
}, [reservations])
  console.log(reservated)
  return (
    <div>
      <h2>Tu perfil</h2>
      <span>Reservas pendientes</span>
      {reservated.length && reservated.map(res => {
        return(
          <>
            <span>Dia</span>
            <span>{res.day}</span>
          </>
        )
        
      })}
    </div>
  );
};


const mapStateToProps = state => {
  return {
    loggedUser: state.authReducer.loggedUser,
    reservations: state.reservationsR.reservations
  }
}

const mapDispatchToProps = {
  getReservations: reservationActions.getReservations
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)