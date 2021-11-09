/**
 * PatientNavList.js
 *
 * function PatientNavList() - Philip Nylén, Erik Jareman - DRAFT
 */
import './PatientNavList.css'
import { Link } from 'react-router-dom'
import trends from '../assets/trends.png'
import notificationBell from '../assets/notificationBell.png'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * The function PatientNavList renders the list of patients, currently
 * only psuedo-data
 * Philip Nylén, Erik Jareman
 * FIXING
 */
export default function PatientNavList () {
  /* const patients = [
    {
      id: 1,
      name: 'Fredrik Olsson',
      pnum: '930217-5150',
      timer: '00:15',
      arrival: '13:15',
      reasonForVisit: 'Benbrott',
      team: 'A',
      room: 1
    },
    {
      id: 2,
      name: 'Karl Boström',
      pnum: '870427-0227',
      timer: '05:34',
      arrival: '14:27',
      reasonForVisit: 'Buksmärtor',
      team: 'B',
      room: 5
    }
  ] */

  /**
  * Below code snippet currently only works for location = Motala since the others contain 'åäö'
  * The below snippet is done, the name handling for Linköping & Norrköping needs to be altered in Startform.js
  * or in the backend
  * Philip Nylén
  * FINAL
  */
  const [patients, setPatients] = useState([])
  useEffect(() => {
    axios.get('https://backend-c4company.herokuapp.com/patients/' + localStorage.getItem('localLocation'))
      .then(res => {
        const persons = res.data
        setPatients(persons)
      })
  }, [])

  return (
    <ul>
      {patients.map((patient) => {
        return (
          <li key={patient.id}>
            <Link
              to={{
                pathname: `/patient/${patient.id}`,
                state: { patients: patient }
              }}
            >
              <table>
                {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
                <h3 className='medium'>{patient.timer}</h3>
                <h3>{patient.arrival}</h3>
                <h3 className='long'>{patient.name}</h3>
                <h3 className='long'>{patient.id}</h3>
                <h3 className='long'>{patient.reason}</h3>
                <h3>{patient.team}</h3>
                <h3>{patient.room}</h3>
              </table>
            </Link>
            <a className='nav-link' href='/' id='profilePicture'>
              <img src={trends} className='trends' alt='Not found' />
            </a>
            <a className='nav-link' href='/' id='profilePicture'>
              <img
                src={notificationBell}
                className='notificationBell'
                alt='Not found'
              />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
