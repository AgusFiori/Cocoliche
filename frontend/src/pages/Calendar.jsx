import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../App.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import eventsActions from "../redux/actions/eventsActions";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import blackboard from '../assets/blackboard.jpg'

const Calendary = (props) => {
  const [event, setEvent] = useState([])
  const [numero, setNumeroReserva] = useState("")

  const { getEvents } = props;
  useEffect( () => {
    getEvents();
    setEvent(props.events)
  }, [getEvents, event]);

  console.log(props.loggedUser)


  const eventos = event.map(event => {
    return (
      event = {
        id: event._id,
        title: event.title,
        start: event.dateEvent,
        picture: event.picture
      }
    )
  })
  const handleDateClick = (arg) => {
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
          if (result.isConfirmed) {
            if(props.loggedUser) {
              Swal.fire({
                html: 
                '<span>Cantidada de sillas a reservar</span>'+
                '<input type="number" id="swal-input2" class="swal2-input">',
                showCancelButton: true,
                cancelButtonText: 'Holaa'
              }).then((result)=>{
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
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Debe registrarse primero',
                footer: '<div class="d-flex align-items-center"><p>tienes cuenta?</p></div><div class="d-block"><button class="btn btn-primary">Registrarse</button></div>'
              })

            }
          }
        })

      } 
    })
  }

  
  return (
      
      <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2 position-sticky nav-coco" style={{backgroundImage: `url(${blackboard})`}}>
                    <Navbar />
                </div>
                
              <div className="calendario col-sm-12 col-md-7 col-lg-10 col-xl-10">
                <FullCalendar
                  plugins={[interactionPlugin, dayGridPlugin, bootstrapPlugin]}
                  locale="es-ES"
                  themeSystem = 'bootstrap'
                  customButtons= {{
                    myCustomButton: {
                      icon: 'fa-times',
                      text:"Ver eventos",
                      click: function() {
                          Swal.fire({
                            html: eventos.map(events =>
                              '<div class="card bg-dark text-white">'+
                                `<img class="card-img" src=${events.picture} alt="Card image"/> ` +
                                  '<div class="card-img-overlay">'+
                                    `<h5 class="card-title">${events.title}</h5>` +
                                    '<p class="card-text"></p>'+
                                    `<p class="card-text">${events.start}</p>` +
                                '</div>'+
                              '</div>')
                          })
                        
                      }
                    },
                  }}
                  headerToolbar= {{
                    end: 'myCustomButton'
                  }}
                  selectable={true}
                  events= {eventos}
                  dayMaxEvents={true}
                  dateClick={handleDateClick}   
                  contentHeight={500}
                />
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
  getEvents: eventsActions.getEvents
}
export default connect(mapStateToProps,mapDispatchToProps)(Calendary);
