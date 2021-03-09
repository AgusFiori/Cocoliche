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
    }

    return (
        <div>
            {visible ? 
            <>
                <span>Ingrese la nueva fecha</span>
                <input defaultValue={props.day} name="day" onChange={captureNewDate} type="date"  />  
                <span>Ingrese la nueva cantidad</span>
                <input onChange={captureNewDate} name="quantity" type="number" defaultValue={props.quantity} />
                <button id={props._id} onClick={editReservation}>Enviar</button>
                <button id={props._id} onClick={() => setVisible(!visible)}>Cancelar</button>
            </>
            :
            <>
                <span className="col-12">DÍA</span>
                <span className="col-12">{props.day}</span>
                <span className="col-12">Sillas reservadas</span>
                <span className="col-12">{props.quantity}</span>
                <button  onClick={() => setVisible(!visible)}>Editar</button>
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
    editReservation: reservationActions.editReservation
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingReservations)