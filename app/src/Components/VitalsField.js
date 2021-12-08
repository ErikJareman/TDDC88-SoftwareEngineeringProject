/**
 * Component for the vital parameters on patinet page
 *
 * FINAL
 *
 * Author Viktor Storsved, Marcus Vidgren, Philip Nylén and David Råsberg
 *
 * 2021-11-11: Created
 * 2021-11-17: Vitals connected to back-end
 * 2021-11-19: Tab stays the same on refresh
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

export default function VitalFields (props) {
  const [id] = useState(props.id)
  const injections = props.injections
  const ekg = FilterEvents({ list: props.events, filterField: 'type', filterBy: 'Labbsvar EKG', sortBy: 'time' })
  const drugs = FilterEvents({ list: props.drugs, sortBy: 'time' })

  const handleTabChange = (e, data) => {
    localStorage.setItem('activeVitalIndex', data.activeIndex)
  }
  const panes = [
    {
      menuItem: { icon: 'doctor big' },
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
      menuItem: { icon: 'exchange big' },
      render: () => <Tab.Pane>
        <PatientInUt id={id} injections={injections} />
      </Tab.Pane>
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
        panes={panes}
        defaultActiveIndex={localStorage.getItem('activeVitalIndex') || 0}
        onTabChange={handleTabChange} />
    </div>
  )
}
