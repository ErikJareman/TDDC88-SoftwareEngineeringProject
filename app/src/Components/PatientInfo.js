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
import React from 'react'
import TeamView from './TeamView'
import RoomView from './RoomView'

export default function PatientInfo (patient) {
  return (
    <div className='PatientInfo-div'>
      <h1> Patientinfo  </h1>
      <h5><Icon name='user' />{patient.patient.name}, {patient.patient.pnum}</h5>
      <h5><Icon name='address book' /> ISS: </h5>
      <h5><Icon name='ambulance' /> Ambulans </h5>
      <TeamView />
      <RoomView />
      <ReasonForVisit />
    </div>
  )
}
