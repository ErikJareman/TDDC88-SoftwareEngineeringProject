/**
* PatientNavBar.js
* Component for sub-navbar in patient-view
*
* Author David Råsberg, Rough draft
*/

import './PatientNavBar.css'
import NameDisplay from './NameDisplay'
import { Link } from 'react-router-dom'
import React from 'react'

export default function PatientNavBar (patient) {
  return (
    <div className='patient-nav-bar'>
       <NameDisplay patient={patient.patient} />
        <Link to='/'>
        <button style={{ backgroundColor: 'lightGrey' }}>
           Back to patient list
        </button>
        </Link>
    </div>
  )
}
