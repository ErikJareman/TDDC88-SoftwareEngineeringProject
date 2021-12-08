import PatientNavList from '../../Components/PatientNavList'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import OverviewNavBar from '../../Components/OverviewNavBar'
import HeaderField from '../../Components/HeaderField'
import HeaderPatientList from '../../Components/HeaderPatientList'

export default function Home () {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    axios.get('https://backend-c4company.herokuapp.com/patients/' + localStorage.getItem('localLocation'))
      .then(res => {
        let persons = []
        persons = res.data
        persons.sort((a, b) => (a.team > b.team) ? 1 : ((b.team > a.team) ? -1 : 0))
        setPatients(persons)
      })
  }, [])

  return (
    <div>
      <HeaderField patients={patients} />
      <OverviewNavBar />
      <HeaderPatientList />
      <PatientNavList patients={patients} />
    </div>
  )
}
