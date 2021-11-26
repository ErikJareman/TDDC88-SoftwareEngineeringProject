/**
* NotificationField.js
*
* Field of notifications when clicking on bell icon
*
* Martin Jonson - DRAFT
*/

import React from 'react'
import NotificationCard from './NotificationCard'
import './NotificationField.css'

function NotificationField (props) {
  const alertList = props.events.map((event) => {
    return (
      <div key={event.event.id + event.patient.id} id='event-list' style={{ width: '300px' }}>
        <NotificationCard patient={event.patient} event={event.event} />
      </div>
    )
  })

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
