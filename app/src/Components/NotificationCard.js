import React from 'react'
import { Icon } from 'semantic-ui-react'
import pipett from '../assets/pipett.png'

function NotificationCard (props) {
  const patient = props.patient
  const event = props.event

  const sweToEng = { Gubbe: 'street view', Doktor: 'doctor', Ambulans: 'ambulance', Hus: 'home', Pippett: pipett, Medkit: 'medkit', Heartbeat: 'heartbeat' }

  return (
    <table>
      <tbody>
        <tr>
          <th>
            <h4>{event.category === 'Pippett'
              ? <img style={{ height: '2vh' }} src={sweToEng[event.category]}></img>
              : <Icon name={sweToEng[event.category]} size='large' />}
            </h4>
          </th>
          <th style={{ paddingLeft: '6px' }}>
            <p>{patient.name}<br/>{patient.SSN}</p>
          </th>
          <th style={{ paddingLeft: '6px' }}>{event.type}</th>
          <th style={{ paddingLeft: '6px' }}>{event.time.substring(0, 5)}</th>
        </tr>
      </tbody>
    </table>
  )
}

export default NotificationCard
