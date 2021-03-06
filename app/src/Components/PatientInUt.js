import './PatientInUt.css'
import React from 'react'

/**
 * The function PatientInUt renders the list of patients intravenous injections, currently
 * only psuedo-data
 * Viktor Storsved, Marcus Vidgren
 */
export default function PatientInUt () {
  /*
  Dummy data, shall be updated when the back-end is in place
  */
  const intravenousInjection = [
    {
      id: '1',
      type: 'PVK',
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
      <h3 className='inUtTextBox'> Typ</h3>
      <h3 className ='inUtTextBox'>Storlek</h3>
      <h3 className='inUtTextBox'>Lokalisation</h3>
      <h3 className='inUtTextBox'>Tid</h3>
      </table>
      </li>
      {intravenousInjection.map((injection) => {
        return (
          <li key={injection.id}>
            <table>
              {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
              <h3 className='inUtTextBox'>{injection.type}</h3>
              <h3 className='inUtTextBox'>{injection.size}</h3>
              <h3 className='inUtTextBox'>{injection.locatization}</h3>
              <h3 className='inUtTextBox'>{injection.time}</h3>
            </table>
          </li>
        )
      })}
    </ul>
  )
}
