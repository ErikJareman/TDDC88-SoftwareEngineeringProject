import PatientNavList from '../../Components/PatientNavList'
import './Home.css'
import React from 'react'
import HeaderField from '../../Components/HeaderField'

export default function Home () {
  return (
    <div>
      <HeaderField />
      <PatientNavList />
    </div>
  )
}
