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
      <div>
        {'Datum: ' + props.time}
      </div>
    </>
  )
}
