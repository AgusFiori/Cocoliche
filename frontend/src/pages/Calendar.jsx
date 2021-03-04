import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../App.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import eventsActions from "../redux/actions/eventsActions";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import Swal from "sweetalert2";

const Calendary = (props) => {
  const [event, setEvent] = useState([])
  const [numero, setNumeroReserva] = useState("")

  const { getEvents } = props;
  useEffect( () => {
    getEvents();
    setEvent(props.events)
  }, [getEvents, event]);


  const eventos = event.map(event => {
    return (
      event = {
        id: event._id,
        title: event.title,
        start: event.dateEvent,
        
      }
    )
  })


  
  const handleDateClick = (arg) => {
    console.log(arg)
    event.map(event => {
      if (event.dateEvent === arg.dateStr) {
        Swal.fire({
          title: event.title,
          text: 'Modal with a custom image.',
          imageUrl: event.picture,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          showCancelButton: true,
          confirmButtonText: 'Pedir reserva',
          cancelButtonText: 'Cerrar',
          reverseButtons: true
        }).then((result) => {
          console.log(result)
          if (result.isConfirmed) {
            Swal.fire({
              html: 
              '<span>Cantidada de sillas a reservar</span>'+
              '<input type="number" id="swal-input2" class="swal2-input">',
              preConfirm: () => {
                return document.getElementById('swal-input2').value
                
              }
            }).then((result)=>{

              console.log(result)
              if (result.value !== "") {
                Swal.fire({
                  icon:'success',
                  title:'Recibira un mail con la confirmacion',
                })
              } else {
                Swal.fire({
                  icon:'error',
                  title:'No puso cantidad de personas',
                })
              }
            })
          }
        })

      } 
    })
  }
  // const handleEventClick = (arg) => {
  //   console.log(arg)
  //   Swal.fire({
  //     title: eventos.title,
  //     text: eventos.descripcion,
  //     imageUrl: eventos.picture,
  //     imageWidth: 400,
  //     imageHeight: 200,
  //     imageAlt: 'Custom image',
  //   })}

  
  return (
    <div className="container">
      <div className="calendario mt-5">
        <FullCalendar
          plugins={[interactionPlugin, dayGridPlugin, bootstrapPlugin]}
          locale="es-ES"
          // customButtons= {{
          //   myCustomButton: {
          //     icon:'fa-chevron-left',
          //     text:"Ver eventos",
          //     click: function() {
          //       Swal.fire({
          //         title: event.title,
          //         text: event.descripcion,
          //         imageUrl: event.picture,
          //         imageWidth: 400,
          //         imageHeight: 200,
          //         imageAlt: 'Custom image',
          //       })
          //     }
          //   },
          // }}
          // headerToolbar= {{
          //   end: 'myCustomButton'
          // }}
          selectable={true}
          events= {eventos}
          dayMaxEvents={true}
          dateClick={handleDateClick}
          // eventClick={handleEventClick}          
          contentHeight={500}
        />
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    events: state.eventR.events
  }
}   

const mapDispatchToProps = {
  getEvents: eventsActions.getEvents
}
export default connect(mapStateToProps,mapDispatchToProps)(Calendary);
