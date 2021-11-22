import './Patient.css'
import PatientNavBar from '../../Components/PatientNavBar'
import PatientInfo from '../../Components/PatientInfo'
import TimelineComponent from '../../Components/TimelineComponents/TimelineComponent'
import PatientCurrentEvents from '../../Components/PatientCurrentEvents'
import { Grid, Segment } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import HeaderField from '../../Components/HeaderField'
import VitalsField from '../../Components/VitalsField'
import axios from 'axios'
import Refresher from '../../Components/Refresher'

export default function Patient () {
  const { state } = useLocation()
  const [vitals, setVitals] = useState([])
  const [currentEvents, setCurrentEvents] = useState([])
  const [injections, setInjections] = useState()
  const [drugs] = useState()

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
    // request to get injections
    axios.get('https://backend-c4company.herokuapp.com/patients/' + state.patients.id + '/injections')
      .then(res => {
        setInjections(res.data)
      })

    // request to get list of drugs
    /* axios.get('https://backend-c4company.herokuapp.com/patients/' + state.patients.id + '/drugs')
      .then(res => {
        setDrugs(res.data)
      }) */
  }, [])

  return (
    <>
      <HeaderField />
      <PatientNavBar patient={state.patients} />
      <Grid>
        <Grid.Row stretched>
          <Grid.Column style={{ width: '33%' }}>
            <Segment >
              <PatientInfo patient={state.patients} triageColor={state.triageColor} vitals={currentEvents} />
            </Segment>
          </Grid.Column>
          <Grid.Column style={{ width: '66%' }}>
            <Segment>
              <TimelineComponent patient={state.patients}/>
            </Segment>
          </Grid.Column>

        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column style={{ width: '33%' }}>
            <PatientCurrentEvents currentEvents={currentEvents} patient={state.patients} />
          </Grid.Column>
          <Grid.Column style={{ width: '67%' }}>
            <VitalsField id={state.patients.id} vitals={vitals} injections={injections} drugs={drugs} events={currentEvents} />
          </Grid.Column>
          <Refresher />
        </Grid.Row>
      </Grid>
    </>
  )
}
