/**
 * Component for the vital parameters on the patient page.
 * Isak Berntsson & Linus Bäckbro Kuusisto
 * issue #31
 */
import React from 'react'
import { Grid, Segment, Header, Icon } from 'semantic-ui-react'
import './PatientVitalValues.css'
// import FilterEvents from './FilterEvents'
/**
 * Function that generates segment for one patient vital-value.
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
 * creates the full component by mapping over patient-data from backend and applying the generateSegment-function.
 */
const SegmentHorizontalSegments = (props) => {
  return (< Segment.Group size='mini' >
    {props.vitals.map(generateSegement)}
  </Segment.Group >)
}

export default SegmentHorizontalSegments
