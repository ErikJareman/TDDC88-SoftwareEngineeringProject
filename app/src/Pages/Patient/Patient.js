import './Patient.css'

// import Refresher from '../../Components/Refresher'
import PatientNavBar from '../../Components/PatientNavBar'
import PatientInfo from '../../Components/PatientInfo'
import TimelineComponent from '../../Components/TimelineComponents/TimelineComponent'
import PatientCurrentEvents from '../../Components/PatientCurrentEvents'
// import PatientVitalValues from '../../Components/PatientVitalValues'
import { Grid, Segment } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
// import PatientInUt from '../../Components/PatientInUt'
import HeaderField from '../../Components/HeaderField'
import VitalsField from '../../Components/VitalsField'
import axios from 'axios'

export default function Patient () {
  const { state } = useLocation()
  const [vitals, setVitals] = useState([])
  const [currentEvents, setCurrentEvents] = useState([])
  useEffect(() => {
    axios.get('https://backend-c4company.herokuapp.com/patients/' + state.patients.id + '/vitals')
      .then(res => {
        setVitals(res.data)
      })
    // request to fetch data for currentEvents
    axios.get('https://backend-c4company.herokuapp.com/patients/' + state.patients.id + '/events')
      .then(res => {
        setCurrentEvents(res.data)
      })
    // request to get injetions
  }, [])

  return (
    <>
      <HeaderField />
      <PatientNavBar patient={state.patients} />
      <Grid>
        <Grid.Row stretched>
          <Grid.Column style={{ width: '33%' }}>
            <Segment >

              <PatientInfo patient={state.patients} triageColor={state.triageColor} />
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
            <PatientCurrentEvents currentEvents={currentEvents} patient={state.patients} />
          </Grid.Column>
          <Grid.Column style={{ width: '67%' }}>
            <VitalsField id={state.patients.id} vitals={vitals} />
          </Grid.Column>
          {/* <Grid.Column style={{ width: '33%' }}>
            <Segment>
              <PatientInUt />
            </Segment>
          </Grid.Column>
          <Grid.Column style={{ width: '33%' }}>
            <Segment>
              <PatientVitalValues patient={state.patients} />
              <Refresher />
            </Segment>
          </Grid.Column> */}
        </Grid.Row>
      </Grid>
    </>
  )
}
