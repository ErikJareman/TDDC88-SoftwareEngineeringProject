/**
 * Component for the vital parameters on patinet page
 *
 * WIP
 *
 * Author Viktor Storsved, Marcus Vidgren and David Råsberg
 *
 * 2021-11-11: Created
 * 2021-11-17: Vitals connected to back-end
 *
 */

import React, { useState } from 'react'
import { Tab } from 'semantic-ui-react'
import PatientInUt from './PatientInUt'
import PatientVitalValues from './PatientVitalValues'
import PatientEkg from './PatientEkg'
import FilterEvents from './FilterEvents'
import PatientDrugs from './PatientDrugs'
import NoValueInfo from './NoValueInfo'
import InOut from '../assets/inut.png'
import Vitals from '../assets/vitals.png'

export default function VitalFields (props) {
  const [id] = useState(props.id)
  const injections = props.injections
  const ekg = FilterEvents({ list: props.events, filterField: 'type', filterBy: 'Labbsvar EKG', sortBy: 'time' })
  const drugs = props.drugs

  const CustomInUt = (
    <i className="tabIcon">
      <img id="tabImage" src={InOut} />
    </i>
  )
  const CustomVitals = (
    <i className="tabIcon">
      <img id="tabImage" src={Vitals} />
    </i>
  )

  const panes = [
    {
      menuItem: { icon: CustomVitals },
      render: () => <Tab.Pane>
        <PatientVitalValues id={id} vitals={props.vitals} />
      </Tab.Pane>
    },
    {
      menuItem: { icon: 'heartbeat big' },
      render: () => <Tab.Pane>
        <PatientEkg ekg={ekg} />
      </Tab.Pane>
    },
    {
      menuItem: { icon: 'pills big clockwise' },
      render: () => <Tab.Pane>
        <ul>
          {drugs !== undefined && drugs.length > 0
            ? drugs.map((drug) => {
              return (<PatientDrugs key={drug.name + '_' + drug.time} drug={drug} />)
            })
            : <NoValueInfo />}
        </ul>
      </Tab.Pane>
    },
    {
      menuItem: { icon: CustomInUt },
      render: () => <Tab.Pane>
        <PatientInUt id={id} injections={injections} />
      </Tab.Pane>
    },
    {
      menuItem: { icon: 'group big' }, render: () => <Tab.Pane></Tab.Pane>
    }
  ]
  return (
    <div>
      <Tab
        menu={{
          attached: true,
          tabular: true,
          style: { display: 'flex', justifyContent: 'center' }
        }}
        panes={panes} />
    </div>
  )
}
