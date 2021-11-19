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
  const time = new Date(drug.time)
  return (
    <div>
      {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}

      <h3 className='inUtTextBox'>{drug.name + ', ' + drug.strength}</h3>
      <h3 className='inUtTextBox'>{drug.absorption + ', ' + drug.type}</h3>
      <h3 className='inUtTextBox'>{drug.dosage}</h3>
      <h3 className='inUtTextBox'>{time.getHours() + ':' + time.getMinutes()}</h3>
    </div>

  )
}
