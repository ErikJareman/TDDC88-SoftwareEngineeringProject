import './PatientInUt.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * The function PatientInUt renders the list of patients intravenous injections
 * Viktor Storsved, Marcus Vidgren
 */
export default function PatientInUt (patient) {
/**
 * Constant to store injections in a way so .map function works
 */
  let empty = true
  const [injections, setInjections] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/patients/' + patient.patient + '/injections')
      .then(res => {
        const patientInjection = res.data
        console.log('res data')
        console.log(res.data)
        console.log(res.data)
        setInjections(patientInjection)
        if (injections.length > 0) {
          console.log('Ej tomt')
          empty = false
          console.log(empty)
        }
      })
  }, [])
  /**
    * This if-statement checks if there is any data to show in in - ut farter
    */
  if (Object.entries(injections).length > 0) {
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
        console.log(injections.length)
        if (injections.length > 0) {
          return (
          <li key={injection.id}>
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
        } else {
          console.log(injections.length)
          return (
            <li key={injection.id}>
              <div id="linkList">
          <h3 className='inUtTextBox'>No data available</h3>
          </div>
          </li>
          )
        }
      })}
    </ul>
    )
  } else {
    /**
     * This if-statement checks if there is any data to show in in - ut farter
     */
    console.log('det är tomt')
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
