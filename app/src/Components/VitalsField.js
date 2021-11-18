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

export default function VitalFields (props) {
  const [id] = useState(props.id)
  const injections = props.injections
  /* <Ekg ekg={ekg[0]} />
  const ekg = [{ ekg: '1', time: new Date(now() - 500000) }] */

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

      </Tab.Pane>
    },
    {
      menuItem: { icon: 'pills big clockwise' }, render: () => <Tab.Pane></Tab.Pane>
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
