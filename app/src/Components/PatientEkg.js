/**
 * Component to render EKG-chart
 *
 * WIP
 */

import React from 'react'
import patientEkg from '../assets/patient_ekg.png'
import FilterEvents from './FilterEvents'

export default function PatientEkg (props) {
  const ekgEvents = FilterEvents({ list: props.events, filterBy: 'Labbsvar EKG' })
  return (
    <>
      <h2>
        {ekgEvents.length > 0 ? <img src={patientEkg} ></img> : 'Ingen EKG'}
      </h2>
      <p>
        {'Datum: ' + props.time.getFullYear() + '-' + props.time.getMonth() + '-' + props.time.getDay()}
      </p>
      <p>
        {props.time.getHours() + ':' + props.time.getMinutes() + ':' + props.time.getSeconds()}
      </p>
    </>
  )
}
