/**
 * Component that renders the drugs given to a patient
 *
 *
 * 2021-11-18: created
 *
 * WIP
 */

import React from 'react'

export default function PatientDrugs (props) {
  const drug = props.drug
  console.log(drug)
  // Absorption is misspelled in backend, will have to misspell here to match
  return (
    <div>
      <h3 className='inUtTextBox'>{drug.name + ', ' + drug.strength}</h3>
      <h3 className='inUtTextBox'>{drug.absortion + ', ' + drug.type}</h3>
      <h3 className='inUtTextBox'>{drug.dosage + ' tablett(-er)'}</h3>
      <h3 className='inUtTextBox'>{drug.time}</h3>
    </div>

  )
}
