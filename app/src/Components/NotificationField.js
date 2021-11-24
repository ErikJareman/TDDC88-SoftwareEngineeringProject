/**
* NotificationField.js
*
* Field of notifications when clicking on bell icon
*
* Martin Jonson - DRAFT
*/

import React from 'react'
import EventCard from './EventCard'
import './NotificationField.css'

function NotificationField (props) {
  const alertList = props.events.map((event) =>
    <EventCard event={event} key={event.category + '_' + event.time} name={event.type} time={event.time} color='green' image={event.category}/>
  )

  return (
    <>
      <div id="not-header">
        <h3>Notiser</h3>
      </div>
      {alertList}
    </>
  )
}
export default NotificationField
