import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import blackboard from '../assets/blackboard.jpg'
import reservedActions from './../redux/actions/reservationActions';
import  Swal  from 'sweetalert2';


const Reservation = (props) => {
    const [reservation, setReservation] = useState({
        dia: "",
        cantidad: ""
    })
    const captureReservation = e => {
        const { name, value } = e.target
        setReservation({...reservation,
        [name]: value})
    }

    const sendReservation = e => {
        if(!props.loggedUser){
            Swal.fire("Ingresa a tu cuenta para hacer una reserva")
            props.history.push('/login')
            return false
        }
        if(reservation.dia === "" || reservation.cantidad === ""){
            Swal.fire("Rellena todos los campos")
            return false
        }
        e.preventDefault()
        props.sendReservation({reservation, token: props.loggedUser.token})
        setReservation({
            dia: "",
            cantidad:""
        })

    }

    return(
        <div className="container-fluid background">
            <div className="row">
                <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2 position-sticky nav-coco" style={{backgroundImage: `url(${blackboard})`}}>
                    <Navbar />
                </div>
                <div className="trasparent col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-auto my-auto d-flex flex-column text-center border ">
                    <div className="row d-flex justify-content-center">
                        <h1 className="col-12 text-center m-5">Haga su reserva</h1>
                        <input defaultValue={reservation.dia} name="dia" onChange={captureReservation} type="date" className="col-8 d-block"/>
                        <input defaultValue={reservation.cantidad} name="cantidad" onChange={captureReservation}  type="number" className="col-8 mt-3"/>
                        <button aria-autocomplete="false" onClick={sendReservation} className="btn btn-primary mt-4 col-6">Reservar</button>
                    </div>            
                    <div>
                        <Link to="/calendar" className="mt-2 d-flex align-items-center justify-content-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-calendar mb-3 mr-1" viewBox="0 0 16 16">
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                        </svg><p> Ir al calendario</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        events: state.eventR.events,
        loggedUser: state.authReducer.loggedUser,
    }
}   

const mapDispatchToProps = {
    sendReservation: reservedActions.sendReservation    
} 
export default connect(mapStateToProps, mapDispatchToProps)(Reservation)