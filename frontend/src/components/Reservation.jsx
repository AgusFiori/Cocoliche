import React from 'react'

export const Reservation = () => {
    return (
        <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-auto my-auto d-flex flex-column text-center border ">
            <span className="w-75">SELECCIONE EL DÍA PARA EL QUE QUIRE HACER SU RESERVA</span>
            <input className="w-75" type="date" />
            <span className="w-75">¿CUÁNTAS PERSONAS ASISTIRÁN?</span>
            <input  className="w-75" type="number"/>
        </div>
    )
}
