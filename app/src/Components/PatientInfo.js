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
import TriageTimeLeft from './TriageTimeLeft'

export default function PatientInfo (props) {
  return (
    <div className='PatientInfo-div'>
      <h1> Patientinfo  </h1>
      <h5><Icon name='user' />{props.patient.name}, {props.patient.pnum}</h5>
      <h5><Icon name='clock' /> <TriageTimeLeft key={props.patient.id + '.timeChecked'} timeChecked={props.patient.timeChecked} /></h5>
      <h5><Icon name='address book' /> ISS: </h5>
      <h5><Icon name='ambulance' /> Ambulans </h5>
      <TeamView />
      <RoomView />
      <ReasonForVisit />
    </div>
  )
}
