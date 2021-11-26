/**
 * Component to render EKG-chart
 *
 * WIP
 */

import React from 'react'
import patientEkg from '../assets/patient_ekg.png'
import NoValueInfo from './NoValueInfo'

export default function PatientEkg (props) {
  const ekg = props.ekg[0]
  return (
    <>
      <h2>
        {ekg !== undefined
          ? <><img src={patientEkg} ></img>  <h4> Datum: Date here {ekg.time} </h4></>
          /* <p>
            {'Datum: ' + ekg.time.getFullYear() + '-' + ekg.time.getMonth() + '-' + ekg.time.getDay()}
            </p>
            <p>
            {ekg.time.getHours() + ':' + ekg.time.getMinutes() + ':' + ekg.time.getSeconds()}
          </p> */
          : <NoValueInfo />}
      </h2>
    </>
  )
}
