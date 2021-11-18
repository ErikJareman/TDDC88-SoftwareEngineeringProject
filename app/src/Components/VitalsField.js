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
import { Tab, Grid } from 'semantic-ui-react'
import PatientInUt from './PatientInUt'
import PatientVitalValues from './PatientVitalValues'
import PatientEkg from './PatientEkg'

import PatientDrugs from './PatientDrugs'

export default function VitalFields (props) {
  const [id] = useState(props.id)
  const injections = props.injections
  // Temporary. Should come from back-end. Delete later
  const ekg = { time: new Date(Date.now() - 500000) }
  const drugs = [{ name: 'Alvedon', strength: '500mg', absorption: 'Oralt', type: 'Filmdragerad tablett', dosage: '2 tablett(-er) engangsdos', time: new Date((Date.now() - 60 * 1000 * 5)) }, { name: 'Ipren', strength: '400mg', absorption: 'Oralt', type: 'Filmdragerad tablett', dosage: '1 tablett(-er) engangsdos', time: new Date((Date.now() - 60 * 1000 * 8)) }, { name: 'Kodein', strength: '30mg', absorption: 'Oralt', type: 'Filmdragerad tablett', dosage: '1 tablett(-er) engangsdos', time: new Date((Date.now() - 60 * 1000 * 2)) }]

  const panes = [
    {
      menuItem: { icon: 'doctor big' },
      render: () => <Tab.Pane>
        <Grid>
          <Grid.Row stretched>
            <Grid.Column style={{ width: '50%' }}>
              <PatientVitalValues id={id} vitals={props.vitals} />
            </Grid.Column>
            <Grid.Column style={{ width: '50%' }}>
              {/* FilterEvents({ id: id, type: 'vitals', filterBy: 'Puls' }) */}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tab.Pane>
    },
    {
      menuItem: { icon: 'heartbeat big' },
      render: () => <Tab.Pane>
        <PatientEkg time={ekg.time} events={props.events} />
      </Tab.Pane>
    },
    {
      menuItem: { icon: 'pills big clockwise' },
      render: () => <Tab.Pane>
        <ul>
          {drugs.map((drug) => {
            return (<PatientDrugs key={drug.name + '_' + drug.time} drug={drug} />)
          })}
        </ul>
      </Tab.Pane>
    },
    {
      menuItem: { icon: 'exchange big' },
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
      <Tab panes={panes} />
    </div>
  )
}
