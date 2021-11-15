/**
 *  Component for the "Aktuella händelser" on patient page.
 *
 *  WIP
 *
 *  Author Viktor Storsved and Marcsu Vidgren
 */
import React from 'react'
import { Tab } from 'semantic-ui-react'
import PatientInUt from '../Components/PatientInUt'
import PatientVitalValues from '../Components/PatientVitalValues'

function PatientVitalEvents (patient) {
  console.log(patient)
  // console.log(patient.patient.id)
  const panes = [
    {
      menuItem: { icon: 'user md icon' }, render: () => <Tab.Pane><PatientVitalValues patient={patient}/></Tab.Pane>
    },
    {
      menuItem: { icon: 'heartbeat icon' }, render: () => <Tab.Pane> </Tab.Pane>
    },
    {
      menuItem: { icon: 'pills icon' }, render: () => <Tab.Pane> </Tab.Pane>
    },
    {
      menuItem: { icon: 'exchange alternate icon' }, render: () => <Tab.Pane><PatientInUt patient= {patient.patient.id} /></Tab.Pane>
    },
    {
      menuItem: { icon: 'users icon' }, render: () => <Tab.Pane> </Tab.Pane>
    }
  ]
  return (
    <div>
      <Tab panes={panes} />
    </div>
  )
}

export default PatientVitalEvents
