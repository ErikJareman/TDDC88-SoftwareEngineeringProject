/**
 * Component to render EKG-chart
 *
 * WIP
 */

import React from 'react'
import PatientEkgChart from './PatientEkgChart'

export default function PatientEkg (props) {
  const ekg = props.ekg[0]
  const today = new Date()
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  return (
    <>
      <h2>
        {ekg !== undefined
          ? <><PatientEkgChart /> <PatientEkgChart /><h4> Datum: {date} Tid:  {ekg.time.substring(0, 8)} </h4></>
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
