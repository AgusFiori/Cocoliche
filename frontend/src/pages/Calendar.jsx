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
          if (result.isConfirmed) {
            Swal.mixin({
              input: 'text',
              confirmButtonText: 'Next &rarr;',
              showCancelButton: true,
              progressSteps: ['1', '2', '3']
            }).queue([
              {
                title: 'Cantidad de personas',
                text: 'Chaining swal2 modals is easy'
              },
              'Question 2',
              'Question 3'
            ]).then((result) => {
              if (result.value) {
                console.log(result.value)
                const answers = JSON.stringify(result.value)
                Swal.fire({
                  title: 'All done!',
                  html: `
                    Your answers:
                    <pre><code>${answers}</code></pre>
                  `,
                  confirmButtonText: 'Lovely!'
                })
              }
            })
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire(
            'Cancel',
            'Canceled',
            'error'
          )
          }
        })

      } 
    })
  }
  const handleEventClick = (arg) => {
    console.log(arg)
        Swal.fire({
          title: 'Sweet!',
          text: 'Modal with a custom image.',
          imageUrl: event.picture,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
  }

  
  return (
    <div className="container">
      <div className="calendario mt-5">
        <FullCalendar
          plugins={[interactionPlugin, dayGridPlugin, bootstrapPlugin]}
          locale="es-ES"
          customButtons= {{
            myCustomButton: {
              text:"Pedir reserva",
              click: function() {
                Swal.fire({
                  title: 'Sweet!',
                  text: 'Modal with a custom image.',
                  imageUrl: 'https://unsplash.it/400/200',
                  imageWidth: 400,
                  imageHeight: 200,
                  imageAlt: 'Custom image',
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
          eventClick={handleEventClick}
          themeSystem="bootstrap"
          
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
