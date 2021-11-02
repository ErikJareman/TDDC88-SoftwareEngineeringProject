import './Patient.css'

import PatientNavBar from '../../Components/PatientNavBar'
import PatientInfo from '../../Components/PatientInfo'
import PatientTimeLine from '../../Components/PatientTimeLine'
import PatientCurrentEvents from '../../Components/PatientCurrentEvents'
import PatientFooter from '../../Components/PatientFooter'
import { Grid, Segment } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'
import React from 'react'
import PatientNavList from '../../Components/PatientNavList'

export default function Patient () {
  const { state } = useLocation()

  return (
    <>
      <PatientNavBar patient={state.patients} />
      <Grid>
        <Grid.Row stretched>
          <Grid.Column style={{ width: '33%' }}>
            <Segment >

              <PatientInfo patient={state.patients} />
            </Segment>
          </Grid.Column>
          <Grid.Column style={{ width: '67%' }}>
            <Segment>
              <PatientTimeLine patient={state.patients} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column style={{ width: '33%' }}>
            <Segment>
              <PatientCurrentEvents patient={state.patients} />
            </Segment>
          </Grid.Column>
          <Grid.Column style={{ width: '33%' }}>
            <Segment>
              <PatientCurrentEvents patient={state.patients} />
            </Segment>
          </Grid.Column>
          <Grid.Column style={{ width: '33%' }}>
            <Segment>
              <PatientNavList />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched style={{ position: 'fixed', bottom: 0, color: 'black' }}>
          <Grid.Column style={{ width: '100%' }}>
            <Segment>
              <PatientFooter />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
