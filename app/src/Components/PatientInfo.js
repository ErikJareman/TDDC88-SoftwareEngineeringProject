/**
 *  Component for the 'Patientinfo'-box on patient page.
 *
 *
 */

import React from 'react'
import TriageTimeLeft from './TriageTimeLeft'
import accessability from '../assets/accessability.png'

export default function PatientInfo (props) {
  const patient = props.patient
  const triageColor = props.triageColor
  const reason = 'I am having fever and headache... I am having fever and headache... I am having fever and headache... I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and headache...I am having fever and  headacheheadacheheadacheheadacheheadache headache headache headache headache headache headache headache headache headache headacheheadacheheadacheheadacheheadache headache headache headache headache headache headache headache headache headache headacheheadacheheadacheheadacheheadache headache headache headache headache headache headache headache headache headache headacheheadacheheadacheheadacheheadache headache headache headache headache headache headache headache headache headache'

  const imageCss =
  {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '40 %',
    marginBottom: '5%'
  }

  const infoBoxCss = {
    borderStyle: 'ridge',
    borderRadius: '5%',
    width: '100%',
    height: '31vh',
    overflow: 'hidden',
    // textOverflow: 'ellipsis'
    overflowY: 'scroll',
    padding: '3px'
  }

  return (
    <div>
      <img src={accessability} style={imageCss} />
      <div className={'Row'} style={{ display: 'flex' }}>
        <TriageTimeLeft key={patient.id + '.timeChecked'} triageLevel={patient.triageLevel} color={triageColor} style={{ width: '50%' }} />
        <h3 style={{ padding: '3px', marginTop: '0%', marginLeft: ' 5%' }}>{patient.reason}</h3>
      </div>

      {/* Cant get 'textOverflow to work...  */}
      <div style={infoBoxCss}> {reason} </div>
    </div >
  )
}
