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

import React from 'react'
import { Tab, Grid } from 'semantic-ui-react'
/* import PatientVitalValues from '../../Components/'
import PatientInUt from '../../Components/PatientInUt' */

export default function VitalFields (props) {
  const panes = [
    {
      menuItem: { icon: 'doctor big' },
      render: () => <Tab.Pane>
        <Grid>
          <Grid.Row stretched>
            <Grid.Column style={{ width: '50%' }}>
              <p>hej</p>
            </Grid.Column>
            <Grid.Column style={{ width: '50%' }}>
              <p>tja</p>
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
