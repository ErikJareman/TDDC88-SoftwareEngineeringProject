import React from 'react'

function NotificationCard (props) {
  const patient = props.patient
  const event = props.event

  return (
    <table>
      <tbody>
        <tr>
          <th style={{ width: '50%' }}>{patient.name}</th>
          <th style={{ width: '25%' }}>{event.type}</th>
          <th style={{ width: '25%' }}>{event.time}</th>
        </tr>
      </tbody>
    </table>
  )
}

export default NotificationCard
