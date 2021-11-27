/**
* NotificationCard.js
*
* Card that represents a notification in the notification list
*
* Martin Jonson - FINAL
*/

import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import pipett from '../assets/pipett.png'

function NotificationCard (props) {
  const patient = props.patient
  const event = props.event

  const triageColors = ['green', 'yellow', 'orange', 'red']
  const sweToEng = { Gubbe: 'street view', Doktor: 'doctor', Ambulans: 'ambulance', Hus: 'home', Pippett: pipett, Medkit: 'medkit', Heartbeat: 'heartbeat' }

  return (
    <Link style={{ color: 'black' }} to={{
      pathname: `/patient/${patient.id}`,
      state: { patients: patient, triageColor: triageColors[patient.triageLevel - 1] }
    }}>
      <table>
        <tbody>
          <tr>
            <th style={{ width: '50px' }} >
              <h4>{event.category === 'Pippett'
                ? <img style={{ height: '20px' }} src={sweToEng[event.category]}></img>
                : <Icon name={sweToEng[event.category]} size='large' />}
              </h4>
            </th>
            <th style={{ width: '12px' }} />
            <th style={{ width: '200px', textAlign: 'start' }}>
              <p>{patient.name}<br/>{patient.SSN}</p>
            </th>
            <th style={{ width: '12px' }} />
            <th style={{ width: '170px', textAlign: 'start' }}>{event.type}</th>
            <th style={{ width: '12px' }} />
            <th style={{ width: '30px' }}>{event.time.substring(0, 5)}</th>
          </tr>
        </tbody>
      </table>
    </Link>
  )
}

export default NotificationCard
