/**
* PatientNavBar.js
* Component for sub-navbar in patient-view
*
* Author David Råsberg, Rough draft
*/

import './PatientNavBar.css'
import NameDisplay from './NameDisplay'
import React from 'react'

export default function PatientNavBar (patient) {
  return (
    <div className='patient-nav-bar'>
      <UMS patient={patient} />
      <NameDisplay patient={patient.patient} />
    </div>
  )
}
