/**
 *  Component for the 'Patientinfo'-box on patient page.
 *
 *  WIP
 *
 *  Author David Råsberg
 */

import './PatientInfo.css'
import ReasonForVisit from './ReasonForVisit'
import { Icon } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
import TeamView from './TeamView'
import RoomView from './RoomView'
import axios from 'axios'

export default function PatientInfo (patient) {
  const [vitals, setVitals] = useState([])
  const [pulse, setPulse] = useState()

  useEffect(() => {
    axios.get('https://backend-c4company.herokuapp.com/patients/' + patient.patient.id + '/vitals')
      .then(res => {
        setVitals(res.data)
      })
  }, [])

  useEffect(() => {
    axios.get('https://backend-c4company.herokuapp.com/patients/' + patient.patient.id + '/vitals/puls')
      .then(res => {
        setPulse(res.data)
      })
  })

  return (
    <div className='PatientInfo-div'>
      <h1> Patientinfo  </h1>
      <h5><Icon name='user' />{patient.patient.name}, {patient.patient.pnum}</h5>
      <h5><Icon name='address book' /> ISS: </h5>
      <h5><Icon name='ambulance' /> Ambulans </h5>
      {console.log(patient.patient.id)}
      {console.log(vitals)}
      {console.log(pulse)}
      <TeamView />
      <RoomView />
      <ReasonForVisit />
    </div>
  )
}
