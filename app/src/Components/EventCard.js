import './EventCard.css'
import React, { useState } from 'react'
import { Popup } from 'reactjs-popup'
import { Icon } from 'semantic-ui-react'

function EventCard (props) {
  const [opa, setOpa] = useState('100%')

  const sweToEng = { Gubbe: 'street view', Doktor: 'doctor', Ambulans: 'ambulance', Hus: 'home', Pippett: 'syringe', Medkit: 'medkit', Heartbeat: 'heartbeat' }

  return (
    <>
      <Popup trigger={
        <table id='patient-inlagd-group'>
          <tr>
            <th style={{ width: '15%' }}><h4><Icon name={sweToEng[props.image]} size='large' /></h4></th>
            <th style={{ width: '60%' }}><h4 id='event-text'>{props.name}</h4></th>
            <th style={{ width: '15%' }}><h4>{props.time}</h4></th>
            <th style={{ width: '10%' }}><div id='dot-div' style={{ opacity: opa }}><span id='dot'></span></div></th>
          </tr>
        </table>
      } position='right top' onOpen={() => setOpa('0%')}>
        <div id='popup-div'>
          <table>
            <th>
              <h3>props.name</h3>
            </th>
            <th>
              <Icon name={sweToEng[props.image]} size='large' />
            </th>
          </table>
          <p>
            Lorem ipsum
          </p>
        </div>
      </Popup>
    </>
  )
}
export default EventCard
