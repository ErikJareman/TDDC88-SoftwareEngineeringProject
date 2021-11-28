/**
* NotificationField.js
*
* Field of notifications when clicking on bell icon
*
* Martin Jonson - FINAL
*/

import React from 'react'
import NotificationCard from './NotificationCard'
import './NotificationField.css'

function NotificationField (props) {
  let alertList
  console.log(props.events)
  if (props.events.length === 0) {
    alertList = <div style={{ padding: '20px' }}>Inga notiser just nu</div>
  } else {
    alertList = props.events.map((event) => {
      return (
        <div className='notification-card' key={event.event.id + event.patient.id}>
          <NotificationCard patient={event.patient} event={event.event} />
        </div>
      )
    })
  }

  return (
    <>
      <div id='notifications'>
        <div id="not-header">
          <h3>Notiser</h3>
        </div>
        {alertList}
      </div>
    </>
  )
}
export default NotificationField
