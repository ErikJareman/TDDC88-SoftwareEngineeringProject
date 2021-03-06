import './Patient.css'

import PatientNavBar from '../../Components/PatientNavBar'
import PatientInfo from '../../Components/PatientInfo'
import TimelineComponent from '../../Components/TimelineComponents/TimelineComponent'
import PatientCurrentEvents from '../../Components/PatientCurrentEvents'
import PatientFooter from '../../Components/PatientFooter'
import { Grid, Segment } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'
import React from 'react'
import PatientInUt from '../../Components/PatientInUt'
import HeaderField from '../../Components/HeaderField'

export default function Patient () {
  const { state } = useLocation()

  return (
    <>
      <HeaderField />
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
              <TimelineComponent />
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
          </Grid.Column>
          <Grid.Column style={{ width: '33%' }}>
            <Segment>
              <PatientInUt />
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
