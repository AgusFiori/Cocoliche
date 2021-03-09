import React, { useState } from 'react'
import { connect } from 'react-redux';
import reservationActions from './../redux/actions/reservationActions';

const PendingReservations = (props) => {

    const [visible, setVisible] = useState(false)
    const [ newDates, setNewDates ] = useState({})

    const captureNewDate = e => {
        const {value, name} = e.target
        setNewDates({...newDates,
        [name]: value
        })
    }
    const editReservation = e => {
        if(!newDates.quantity && !newDates.day){
            setVisible(!visible)
            return false
        }
        props.editReservation({
            newDates,
            id: e.target.id,
            token: props.loggedUser.token
        })
        setVisible(!visible)
    }
    const deleteReservation = e => {
       e.preventDefault()   
       props.deleteReservation({
            id: e.target.id,
            token: props.loggedUser.token})   
    }

    return (
        <div>
            {visible ? 
            <>
                <p>Ingrese la nueva fecha</p>
                <input defaultValue={props.day} name="day" onChange={captureNewDate} type="date"  />  
                <p>Ingrese la nueva cantidad</p>
                <input onChange={captureNewDate} name="quantity" type="number" defaultValue={props.quantity} />
                <button id={props._id} onClick={editReservation}>Enviar</button>
                <button id={props._id} onClick={() => setVisible(!visible)}>Cancelar</button>
            </>
            :
            <>
                <div>
                    <p>DÍA </p>
                    <p >{props.day}</p>
                </div>
                <div>
                    <p >Sillas reservadas: </p>
                    <p>{props.quantity}</p>
                </div>       
                <button onClick={() => setVisible(!visible)}>Editar</button>
                <button id={props._id}  onClick={deleteReservation}>Elimiar</button>
            </>
        }
            
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedUser: state.authReducer.loggedUser
    }
}

const mapDispatchToProps = {
    editReservation: reservationActions.editReservation,
    deleteReservation: reservationActions.deleteReservation
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingReservations)