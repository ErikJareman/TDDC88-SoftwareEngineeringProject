/**
* PatientNavBar.js
* Component for sub-navbar in patient-view
*
* Author: David Råsberg - FINAL
*/

import './PatientNavBar.css'
import NameDisplay from './NameDisplay'
import React from 'react'
import UMS from './UMS'

export default function PatientNavBar (patient) {
  return (
    <div className='patient-nav-bar'>
      <UMS patient={patient} />
      <NameDisplay patient={patient.patient} />
    </div>
  )
}
