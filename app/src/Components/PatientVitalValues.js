/**
 * Component for the vital parameters on the patient page.
 * Isak Berntsson & Linus Bäckbro Kuusisto
 * issue #31
 */
import React from 'react'
import { Grid, Segment, Header, Icon } from 'semantic-ui-react'
import './PatientVitalValues.css'
/**
 * Function that generates segment for one patient vaital-value.
 */
function generateSegement (vitals) {
  return (
    <Segment size='mini'>
      <Grid columns={3}>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <Icon fitted name='arrow up' size='huge' id="icon" />
          </Grid.Column>
          <Grid.Column textAlign='left'>
            <Header id="typeHeader">
              {vitals.type}
            </Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Header id="valHeader">
              {vitals.value}
            </Header>
            <Header id="timeHeader">
              {vitals.time}
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
/**
 * Should call backend to get patient information. Currently returns static example information.
 */
function getVitals (patientID) {
  // this should be ajax call to backend in future
  const vitals = [
    {
      type: 'PULS',
      time: '12:02',
      value: '87'
    },
    {
      type: 'ANDNING',
      time: '12:03',
      value: '16'
    },
    {
      type: 'BLODTRYCK',
      time: '12:00',
      value: '177/84'
    }
  ]
  return vitals
}

/**
 * creates the full component by mapping over patient-data from backend and applying the generateSegment-function.
 */
const SegmentHorizontalSegments = () => (
  <Segment.Group size='mini'>
    {getVitals('__temp__').map(generateSegement)}
  </Segment.Group>
)

export default SegmentHorizontalSegments
