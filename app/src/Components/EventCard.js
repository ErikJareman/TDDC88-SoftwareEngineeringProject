import './EventCard.css'
import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react'

function EventCard (props) {
  const [color, setColor] = useState(props.color)
  const sweToEng = { Gubbe: 'street view', Doktor: 'doctor', Ambulans: 'ambulance', Hus: 'home', Pipett: 'syringe', Medkit: 'medkit', Heartbeat: 'heartbeat' }
  console.log(props.image)
  return (
    <>
      <table
        id='patient-inlagd-group'
        onClick={() => setColor('grey')}>
        <tr>
          <th><div style={{ backgroundColor: color }} id='rectangle'></div></th>
          <th><h4>{props.name}</h4></th>
          <th><h4><Icon name={sweToEng[props.image]} size='large' /></h4></th>
          <th><h4>{props.time}</h4></th>
        </tr>
      </table>
    </>
  )
}

export default EventCard
