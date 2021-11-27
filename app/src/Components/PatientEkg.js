/**
 * Component to render EKG-chart
 *
 * WIP
 */

import React from 'react'
import patientEkg from '../assets/patient_ekg.png'

export default function PatientEkg (props) {
  const ekg = props.ekg[0]
  var today = new Date()
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  return (
    <>
      <h2>
        {ekg !== undefined
          ? <><img src={patientEkg} ></img>  <h4> Datum: {date} Tid:  {ekg.time.substring(0, 8)} </h4></>
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
