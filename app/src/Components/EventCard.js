/**
* EventCard.js
*
* Cards that display an event for a patient.
*
* Martin Jonson - DRAFT
*/

import './EventCard.css'
import React, { useState } from 'react'
import { Popup } from 'reactjs-popup'
import { Icon } from 'semantic-ui-react'
import pipett from '../assets/pipett.png'

function EventCard (props) {
  const [opa, setOpa] = useState('100%')

  const detailsList =
    [
      {
        name: 'B-hb',
        value: '136',
        reference: '134-170'
      },
      {
        name: 'B-EVF',
        value: '0,41',
        reference: '0,40-0,50'
      },
      {
        name: 'B-Etrocyter',
        value: '4,6',
        reference: '4,3-5,7'
      }
    ]
  const details = detailsList.map((detail) =>
    <>
      <table>
        <th className='right-adjust event-detail-black-text' style={{ width: '50%' }}>{detail.name}</th>
        <th className='right-adjust event-detail-black-text' style={{ width: '25%' }}>{detail.value}</th>
        <th className='right-adjust event-detail-grey-text' style={{ width: '25%' }}>{detail.reference}</th>
      </table>
    </>
  )

  const sweToEng = { Gubbe: 'street view', Doktor: 'doctor', Ambulans: 'ambulance', Hus: 'home', Pippett: pipett, Medkit: 'medkit', Heartbeat: 'heartbeat' }

  return (
    <>
      <Popup trigger={
        <table id='patient-inlagd-group'>
          <tbody>
            <tr>
              <th style={{ width: '15%' }}>
                <h4>{props.image === 'Pippett'
                  ? <img style={{ height: '2vh' }} src={sweToEng[props.image]}></img>
                  : <Icon name={sweToEng[props.image]} size='large' />}
                </h4>
              </th>
              <th style={{ width: '60%' }}><h4 id='event-text'>{props.name}</h4></th>
              <th style={{ width: '15%' }}><h4>{props.time.substring(0, 5)}</h4></th>
              <th style={{ width: '10%' }}>
                <div id='dot-div' style={{ opacity: opa }}>
                  <span id='dot'></span>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      } position='right top' onOpen={() => setOpa('0%')}>
        <div id='popup-div'>
          <table id='detail-table' style={{ width: '100%' }}>
            <th className='right-adjust' style={{ width: '30%' }}>
              <h3>{props.name}</h3>
              <p>{props.time}</p>
            </th>
            <th>
              {props.image === 'Pippett' ? <img style={{ height: '2vh' }} src={sweToEng[props.image]}></img> : <Icon name={sweToEng[props.image]} size='large' />}
            </th>
          </table>
          {details}
        </div>
      </Popup>
    </>
  )
}
export default EventCard
