import React, { useEffect } from "react";
import { connect } from "react-redux";
import "../App.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import eventsActions from "../redux/actions/eventsActions";
import bootstrapPlugin from "@fullcalendar/bootstrap";

const Calendary = (props) => {
  useEffect(() => {
    props.getEvents();
  }, []);

  return (
    <div className="container">
      <div className="calendario mt-5">
        <div>
          <input placeholder="Evento" />
          <select className="w-50 h-100">
            <option></option>
            <option></option>
          </select>
        </div>
        <FullCalendar
          plugins={[interactionPlugin, dayGridPlugin, bootstrapPlugin]}
          locale="es-ES"
          selectable={true}
          dateClick={function (info) {
            alert("Clicked on: " + info.dateStr);
            // change the day's background color just for fun
            info.dayEl.style.backgroundColor = "red";
          }}
          themeSystem="bootstrap"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.eventReducer.events,
  };
};

const mapDispatchToProps = {
  getEvents: eventsActions.getEvents,
};
export default connect(mapStateToProps, mapDispatchToProps)(Calendary);
