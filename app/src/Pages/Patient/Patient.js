import './Patient.css'

import Refresher from '../../Components/Refresher'
import PatientNavBar from '../../Components/PatientNavBar'
import PatientInfo from '../../Components/PatientInfo'
import TimelineComponent from '../../Components/TimelineComponents/TimelineComponent'
import PatientCurrentEvents from '../../Components/PatientCurrentEvents'
import PatientVitalInformation from '../../Components/PatientVitalInformation'
//  import PatientFooter from '../../Components/PatientFooter'
import { Grid, Segment } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom'
import React from 'react'
//  import PatientInUt from '../../Components/PatientInUt'
import HeaderField from '../../Components/HeaderField'
import EventCard from '../../Components/EventCard'

export default function Patient () {
  const { state } = useLocation()

  const cards = [
    <EventCard key='dosering' name='Medicindosering' time='13.38' color='green' image='accessability'
      details={
        [
          {
            name: 'B-hb',
            value: '136',
            reference: '134-170'
          },
          {
            name: 'B-EVF',
            value: '0,41',
            reference: '0,40-0,50'
          },
          {
            name: 'B-Etrocyter',
            value: '4,6',
            reference: '4,3-5,7'
          }
        ]
      }
    />,
    <EventCard key='ordination' name='Medicin ordination' time='17.00' color='blue' image='portal' />,
    <EventCard key='Mat' name='Smörgås och saft' time='15.40' color='green' image='firstAid' />,
    <EventCard key='Mat' name='Patient inlagd' time='13.00' color='blue' image='firstAid' />
  ]

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
            <Segment>
              <PatientCurrentEvents cards={cards} patient={state.patients} />
            </Segment>
          </Grid.Column>
          <Grid.Column style={{ width: '65%' }}>
            <Segment>
              <PatientVitalInformation patient={state.patients} />
            </Segment>
          </Grid.Column>
          <Refresher />
        </Grid.Row>
      </Grid>
    </>
  )
}
