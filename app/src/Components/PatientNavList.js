/**
 * PatientNavList.js
 *
 * function PatientNavList() - Philip Nylén, Erik Jareman - DRAFT
 */
import './PatientNavList.css'
import { Link } from 'react-router-dom'
import TriageTimeLeft from './TriageTimeLeft'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import checkbox from '../assets/checkbox.png'
import checkboxselected from '../assets/checkboxselected.png'

/**
 * The function PatientNavList renders the list of patients, currently
 * only psuedo-data
 * Philip Nylén, Erik Jareman
 * FIXING
 */
export default function PatientNavList () {
  /**
  * Below code snippet currently only works for location = Motala since the others contain 'åäö'
  * The below snippet is done, the name handling for Linköping & Norrköping needs to be altered in Startform.js
  * or in the backend
  * Philip Nylén
  * FINAL
  */
  const triageColors = ['green', 'yellow', 'orange', 'red']
  const [patients, setPatients] = useState([])
  useEffect(() => {
    axios.get('https://backend-c4company.herokuapp.com/patients/' + localStorage.getItem('localLocation'))
      .then(res => {
        const persons = res.data
        setPatients(persons)
      })
  }, [])

  const handleChange = (id) => {
    console.log('HEJSAN')
    if (localStorage.getItem('patient' + id)) {
      localStorage.setItem('patient' + id, false)
    } else {
      localStorage.setItem('patient' + id, true)
    }
  }

  return (
    <ul>
      {patients.map((patient) => {
        return (
          <li key={patient.id}>
            <div id="linkList">
              <Link to={{
                pathname: `/patient/${patient.id}`,
                state: { patients: patient, triageColor: triageColors[patient.triageLevel - 1] }
              }}>
                {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
                <h3 key={patient.id + '.timeChecked'} className='medium' style={{ backgroundColor: triageColors[patient.triageLevel - 1] }}><TriageTimeLeft triageLevel={patient.triageLevel} /></h3>
                <h3 className='long'>{patient.reason}</h3>
                <h3 className='long'>{patient.name}</h3>
                <h3 className='long'>{patient.SSN}</h3>
                <h3 className='short'>{patient.arrival}</h3>
                <h3 className='short'>{patient.room}</h3>
              </Link>
            </div>
            <a className='nav-link' href='/home' id='profilePicture'>
              {
                localStorage.getItem('patient' + patient.id) === true
                  ? <img src={checkboxselected} className='trends' alt='Not found' onClick={handleChange(patient.id)} />
                  : <img src={checkbox} className='trends' alt='Not found' onClick={handleChange(patient.id)} />
              }
            </a>
          </li>
        )
      })}
    </ul>
  )
}
