/**
 * Component for the vital parameters on the patient page.
 * Isak Berntsson & Linus Bäckbro Kuusisto
 */
import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
/*
function getVitalValues (patientID) {
  // this should be ajax call to backend in future
  const vitals = [
    {
      type: 'Pulse',
      time: '12:00',
      values: '109'
    },
    {
      type: 'Pulse',
      time: '12:00',
      values: '109'
    }
  ]
  return vitals
} */
const SegmentHorizontalSegments = () => (
  <Segment.Group>
    <Segment.Group horizontal>
      <Segment inverted color='blue'></Segment>
      <Segment>
        <Header as='h5'>
          KROPPSTEMPERATUR
        </Header>
        <Header as='h5'>
          12:00
        </Header>
      </Segment>
      <Segment textAlign='right'>38</Segment>
    </Segment.Group>

    <Segment.Group horizontal>
      <Segment inverted color='blue'></Segment>
      <Segment>
        <Header as='h5'>
          ANDNINGSFREKVENS
        </Header>
        <Header as='h5'>
          12:00
        </Header>
      </Segment>
      <Segment textAlign='right'>16</Segment>
    </Segment.Group>

  </Segment.Group>
)

export default SegmentHorizontalSegments

//  <div class="ui horizontal segments"><div class="ui segment">Left</div><div class="ui segment">Middle</div><div class="ui segment">Right</div></div>

/* function VitalsDimension (value) {
  return <Segment><strong>{value.type}</strong>       <strong>{value.value}</strong> </Segment>
} */

/* export default function VitalValues () {
  return <div>{VitalsDimension(getVitalValues(123))[0]}</div>
} */
