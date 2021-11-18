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
import homeImage from '../assets/home.png'
import portalImage from '../assets/portal.png'
import firstAidImage from '../assets/first_aid.png'
import accessabilityImage from '../assets/accessability.png'

function EventCard (props) {
  const [opa, setOpa] = useState('100%')
  const imgMap = new Map()
  imgMap.set('home', homeImage)
  imgMap.set('portal', portalImage)
  imgMap.set('firstAid', firstAidImage)
  imgMap.set('accessability', accessabilityImage)

  let details =
    <>
      <p>
        Lorem ipsum
      </p>
    </>
  if (props.details != null) {
    details = props.details.map((detail) =>
      <>
        <table>
          <th className='right-adjust event-detail-black-text' style={{ width: '50%' }}>{detail.name}</th>
          <th className='right-adjust event-detail-black-text' style={{ width: '25%' }}>{detail.value}</th>
          <th className='right-adjust event-detail-grey-text' style={{ width: '25%' }}>{detail.reference}</th>
        </table>
      </>)
  }

  return (
    <>
      <Popup trigger={
        <table id='patient-inlagd-group'>
          <tr>
            <th style={{ width: '15%' }}><img src={imgMap.get(props.image)} id='shape'></img></th>
            <th style={{ width: '60%' }}><h4 id='event-text'>{props.name}</h4></th>
            <th style={{ width: '15%' }}><h4>{props.time}</h4></th>
            <th style={{ width: '10%' }}><div id='dot-div' style={{ opacity: opa }}><span id='dot'></span></div></th>
          </tr>
        </table>
      } position='right top' onOpen={ () => setOpa('0%') }>
        <div id='popup-div'>
          <table id='detail-table' style={{ width: '100%' }}>
            <th className='right-adjust' style={{ width: '30%' }}>
              <h3>{props.name}</h3>
              <p>{props.time}</p>
            </th>
            <th id='detail-icon' style={{ width: '70%' }}>
              <img src={imgMap.get(props.image)} id='shape'></img>
            </th>
          </table>
          {details}
        </div>
      </Popup>
    </>
  )
}
export default EventCard
