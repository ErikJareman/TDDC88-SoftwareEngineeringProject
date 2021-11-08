/**
 * Component for the vital parameters on the patient page.
 * Isak Berntsson & Linus Bäckbro Kuusisto
 * issue #31
 */
import React from 'react'
import { Header, Segment, Icon } from 'semantic-ui-react'
import './PatientVitalValues.css'
/**
 * Function that generates segment for one patient vaital-value.
 */
function generateSegement (vitals) {
  return (
 <Segment.Group horizontal size='mini'>
      <Segment> <Icon fitted name='arrow right' size='huge' id="icon"/></Segment>
      <Segment>
        <Header as='h5' id="varNameHeader">
          {vitals.type}
        </Header>
      </Segment>
      <Segment>
       <Header as='h5' id="varNumbHeader">
          {vitals.value}
       </Header>
       <Header as='h5' id="timeHeader">
          {vitals.time}
       </Header>
      </Segment>
    </Segment.Group>
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
      value: '52'
    }
  ]
  return vitals
}

/**
 * creates the full component by mapping over patient-data from backend and applying the generateSegment-function.
 */
const SegmentHorizontalSegments = () => (
  <Segment.Group >
    {getVitals('__temp__').map(generateSegement)}
  </Segment.Group>
)

export default SegmentHorizontalSegments
