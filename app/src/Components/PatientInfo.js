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
  const reason = 'I am having fever anheadacheheadacheheadacheheadacheheadache headache headache d headache... I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and  headacheheadacheheadacheheadacheheadache headache headache headache headache headache headache headache headache headache headacheheadacheheadacheheadacheheadache headache headache headache headache headache headache headache headache headache headacheheadacheheadacheheadacheheadache headache headache headache headache headache headache headache headache headache headacheheadacheheadacheheadacheheadache headache headache headache headache headache headache headache headache headache'

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
        <h5 style={{ backgroundColor: triageColor, width: '25%', padding: '3px' }}><TriageTimeLeft key={patient.id + '.timeChecked'} triageLevel={patient.triageLevel} lastChecked={lastChecked} /></h5>
        <h5 style={{ padding: '3px', marginTop: '0%', marginLeft: '29%', height: ' 100%' }}>{patient.reason}</h5>
      </div>

      <div id="textruta"> {reason} </div>
    </div >
  )
  /* style={infoBoxCss} */
}
