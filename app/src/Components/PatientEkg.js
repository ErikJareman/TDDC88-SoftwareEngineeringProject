/**
 * Component to render EKG-chart
 *
 * WIP
 */

import React from 'react'
import patientEkg from '../assets/patient_ekg.png'

export default function PatientEkg (props) {
  const ekg = props.ekg
  return (
    <>
      <h2>
        {ekg.length > 0
          ? <img src={patientEkg} ></img> +
          <h2> {ekg.time} </h2>
          /* <p>
            {'Datum: ' + ekg.time.getFullYear() + '-' + ekg.time.getMonth() + '-' + ekg.time.getDay()}
            </p>
            <p>
            {ekg.time.getHours() + ':' + ekg.time.getMinutes() + ':' + ekg.time.getSeconds()}
          </p> */
          : 'Ingen EKG'}
      </h2>
    </>
  )
}
