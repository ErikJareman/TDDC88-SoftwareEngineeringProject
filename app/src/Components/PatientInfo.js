/**
 *  Component for the 'Patientinfo'-box on patient page.
 *
 *
 */

import React from 'react'
import TriageTimeLeft from './TriageTimeLeft'
import accessability from '../assets/accessability.png'
import './PatientInfo.css'

export default function PatientInfo (props) {
  const patient = props.patient
  const triageColor = props.triageColor
  const lastChecked = props.lastChecked
  const reason = 'Anledningen till ' + props.patient.name + 's vistelse är problem med ' + props.patient.reason + ' med triage nivå ' + props.patient.triageLevel + '. Patienten är tilldelad team ' + props.patient.team + ' och är placerad i rum ' + props.patient.room + '. Anhöriga till patienten är kontaktade.'

  const imageCss =
  {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40 %',
    marginBottom: '5%'
  }

  /* const infoBoxCss = {
    borderStyle: 'ridge',
    borderRadius: '5%',
    width: '100%',
    height: '31vh',
    overflow: 'hidden',
    // textOverflow: 'ellipsis'
    overflowY: 'scroll',
    padding: '3px'
  */

  return (
    <div id="divi">
      <img src={accessability} style={imageCss} />
      <div id="textBox" style={{ display: 'flex' }}>
        <h5 id="triageBox" style={{ backgroundColor: triageColor, padding: '3px' }}><TriageTimeLeft key={patient.id + '.timeChecked'} triageLevel={patient.triageLevel} lastChecked={lastChecked} /></h5>
        <h5 id="shortReason" style={{ padding: '3px', height: ' 100%' }}>{patient.reason}</h5>
      </div>

      <div id="textruta"> {reason} </div>
    </div >
  )
  /* style={infoBoxCss} */
}
