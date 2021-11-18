import './PatientInUt.css'
import React from 'react'
// import axios from 'axios'
import FilterEvents from './FilterEvents'

/**
 * The function PatientInUt renders the list of patients intravenous injections
 * Viktor Storsved, Marcus Vidgren
 */
export default function PatientInUt (props) {
  /**
   * Constant to store injections in a way so .map function works
   */
  let injections = props.injections

  /**
    * This if-statement checks if there is any data to show in in - ut farter
    */
  if (injections !== undefined) {
    injections = FilterEvents({ sortBy: 'timein', list: injections })
    return (
      <ul>
        {/* <li>
      <table>
      <h3 className='inUtTextBox'> Typ</h3>
      <h3 className ='inUtTextBox'>Storlek</h3>
      <h3 className='inUtTextBox'>Lokalisation</h3>
      <h3 className='inUtTextBox'>Procedure</h3>
      <h3 className='inUtTextBox'>Tid</h3>
      </table>
      </li> */}
        {injections.map((injection) => {
          return (
            <li key={injection.type + '_' + injection.timein}>
              <div id="linkList">
                {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
                <h3 className='inUtTextBox'>{injection.type}</h3>
                <h3 className='inUtTextBox'>{injection.value}</h3>
                <h3 className='inUtTextBox'>{injection.localization}</h3>
                <h3 className='inUtTextBox'>{injection.timein.split('.', 1)}</h3>
                <h3 className='inUtTextBox'>{injection.procedure}</h3>
                <h3 className='inUtTextBox'>{injection.timeout.split('.', 1)}</h3>
              </div>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return (
      <ul>
        {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
        <li>
          <table>
            <h3 className='inUtTextBox'> Ingen data tillgängligt </h3>
          </table>
        </li>
      </ul>
    )
  }
}
