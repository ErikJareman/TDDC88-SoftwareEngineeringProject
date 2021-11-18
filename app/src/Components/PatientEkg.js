/**
 * Component to render EKG-chart
 *
 * WIP
 */

import React from 'react'

export default function PatientEkg (props) {
  return (
    <>
      <h2>
        {props.ekg}
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
