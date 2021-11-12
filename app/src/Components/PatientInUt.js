import './PatientInUt.css'
import React from 'react'

/**
 * The function PatientInUt renders the list of patients intravenous injections, currently
 * only psuedo-data
 * Viktor Storsved, Marcus Vidgren
 */
export default function PatientInUt (patient) {
  /*
  Dummy data, shall be updated when the back-end is in place
  */
  const intravenousInjection = [
    {
      id: '1',
      type: 'abc',
      size: 1.3,
      locatization: 'Vänster/arm',
      time: '05:34'
    }, {
      id: '2',
      type: 'CKB',
      size: 2.3,
      locatization: 'Höger/ben',
      time: '14:38'
    }
  ]

  return (
    <ul className ="injections">
      {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
      <li>
      <table>
      <h3 className='inUtTextBox'>{patient.name}</h3>
      <h3 className ='inUtTextBox'>Storlek</h3>
      <h3 className='inUtTextBox'>Lokalisation</h3>
      <h3 className='inUtTextBox'>Tid</h3>
      </table>
      </li>
      {intravenousInjection.map((patient) => {
        return (
          <li key={patient.id} >
            <table>
              {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
              <h3 className='inUtTextBox'>{patient.name}</h3>
            </table>
          </li>
        )
      })}
    </ul>
  )
}
