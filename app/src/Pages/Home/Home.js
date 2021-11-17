import PatientNavList from '../../Components/PatientNavList'
import './Home.css'
import React from 'react'
import OverviewNavBar from '../../Components/OverviewNavBar'
import HeaderField from '../../Components/HeaderField'
import HeaderPatientList from '../../Components/HeaderPatientList'

export default function Home () {
  return (
    <div>
      <HeaderField />
      <OverviewNavBar />
      <HeaderPatientList />
      <PatientNavList />
    </div>
  )
}
