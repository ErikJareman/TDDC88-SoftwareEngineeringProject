import PatientNavList from '../../Components/PatientNavList'
import './Home.css'
import React from 'react'
import HeaderField from '../../Components/HeaderField'
import HeaderPatientList from '../../Components/HeaderPatientList'

export default function Home () {
  return (
    <div>
      <HeaderField />
      <HeaderPatientList />
      <PatientNavList />
    </div>
  )
}
