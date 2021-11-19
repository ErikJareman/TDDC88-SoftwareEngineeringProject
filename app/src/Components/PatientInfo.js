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
import FilterEvents from './FilterEvents'

export default function PatientInfo (props) {
  let lastChecked = FilterEvents({ list: props.vitals, sortBy: 'time' })[0]
  if (lastChecked) {
    lastChecked = lastChecked.time
  }
  return (
    <div className='PatientInfo-div'>
      <h1> Patientinfo  </h1>
      <h5><Icon name='user' />{props.patient.name}, {props.patient.SSN}</h5>
      <h5 style={{ backgroundColor: props.triageColor }}><Icon name='clock' /> <TriageTimeLeft key={props.patient.id + '.timeChecked'} triageLevel={props.patient.triageLevel} /></h5>
      <h5><Icon name='address book' /> ISS: </h5>
      <h5><Icon name='ambulance' /> Ambulans </h5>
      <TeamView />
      <RoomView />
      <ReasonForVisit />
    </div>
  )
}
