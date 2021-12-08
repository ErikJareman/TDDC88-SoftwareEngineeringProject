/**
 * Component to render EKG-chart
 *
 * David Råsberg & Philip N
 * 
 * FINAL
 */

import React from 'react'
import PatientEkgChart from './PatientEkgChart'
import NoValueInfo from './NoValueInfo'
import './PatientEkg.css'

export default function PatientEkg (props) {
  const ekg = props.ekg[0]
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  return (
    <>
      <h2>
        {ekg !== undefined
          ? <div id="mainEKG">
              <h4> Datum: {date} Tid:  {ekg.time.substring(0, 8)} </h4>
              <div id="ekgContainer"><p className="electrodeText">V1</p><PatientEkgChart /></div>
              <div id="ekgContainer"><p className="electrodeText">V2</p><PatientEkgChart /></div>
              <div id="ekgContainer"><p className="electrodeText">V3</p><PatientEkgChart /></div>
              <div id="ekgContainer"><p className="electrodeText">V4</p><PatientEkgChart /></div>
            </div>
          : <NoValueInfo />}
      </h2>
    </>
  )
}
