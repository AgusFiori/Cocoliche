import React from 'react'
import '../App.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendary = () => {
  return (
    <div className="container">
      <div className="calendario">
        <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        />
      </div>

    </div>
  )
}

export default Calendary;
