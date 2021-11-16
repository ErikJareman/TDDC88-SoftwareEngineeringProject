import './PatientInUt.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * The function PatientInUt renders the list of patients intravenous injections, currently
 * only psuedo-data
 * Viktor Storsved, Marcus Vidgren
 */
export default function PatientInUt (patient) {
  /*
  Dummy data, shall be updated when the back-end is in place
  */
  //  const inUt = []
  //  const obj = { localization: 'bar', procedure: 42, timein: 0, timeout: 0, type: 'aa', value: 0 }
  //  const myArray = []
  //  var injections = []
  const [injections, setInjections] = useState([])

  console.log(patient.patient)
  useEffect(() => {
    axios.get('http://localhost:5000/patients/' + patient.patient + '/injections')
      .then(res => {
        const patientInjection = res.data
        console.log(res.data)
        //  obj.localization = injections
        console.log('Injections')
        console.log(patientInjection)
        console.log('array')
        setInjections(patientInjection)
      })
  }, [])
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
      })}
    </ul>
  )

  // return (
  //   <ul className ="injections">
  //     {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
  //     <li>
  //     <table>
  //     <h3 className='inUtTextBox'> {injections.type}</h3>
  //     <h3 className ='inUtTextBox'>Storlek</h3>
  //     <h3 className='inUtTextBox'>Lokalisation</h3>
  //     <h3 className='inUtTextBox'>Tid</h3>
  //     </table>
  //     </li>
  //     {injections.map((injection) => {
  //       return (
  //         <li key={injection.id}>
  //           <table>
  //             {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
  //             <h3 className='inUtTextBox'>{injection.type}</h3>
  //             <h3 className='inUtTextBox'>{injection.size}</h3>
  //             <h3 className='inUtTextBox'>{injection.locatization}</h3>
  //             <h3 className='inUtTextBox'>{injection.time}</h3>
  //           </table>
  //         </li>
  //       )
  //     })}
  //   </ul>)
}
