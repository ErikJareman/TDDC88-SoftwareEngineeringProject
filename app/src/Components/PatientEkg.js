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
          ? <><img src={patientEkg} ></img>  <h4> Tid:  {ekg.time.substring(0, 5)} </h4></>
          : <NoValueInfo />}
      </h2>
    </>
  )
}
