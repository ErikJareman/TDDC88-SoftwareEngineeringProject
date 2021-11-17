/**
 * Component for the vital parameters on patinet page
 *
 * WIP
 *
 * Author David
 *
 * 2021-11-11: Created
 *
 */

import React, { useState } from 'react'
import { Tab, Grid } from 'semantic-ui-react'
import PatientVitalValues from './PatientVitalValues'

export default function VitalFields (props) {
  const [id] = useState(props.id)
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
      menuItem: { icon: 'heartbeat big' }, render: () => <Tab.Pane></Tab.Pane>
    },
    {
      menuItem: { icon: 'pills big clockwise' }, render: () => <Tab.Pane></Tab.Pane>
    },
    {
      menuItem: { icon: 'exchange big' }, render: () => <Tab.Pane></Tab.Pane>
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
