/**
 * Component for the vital parameters on the patient page.
 * Isak Berntsson & Linus Bäckbro Kuusisto
 * issue #31
 */
import React from 'react'
import { Grid, Segment, Header, Table } from 'semantic-ui-react'
import './PatientVitalValues.css'
import './VitalHistory.js'
/**
 * Function that generates segment for one patient vaital-value.
 */
function generateSegement (vitals) {
  return (
  <Segment onClick={() => handleClick(vitals.type)} size='mini'>
    <Grid columns={2}>
      <Grid.Row verticalAlign='middle'>
        {/* <Grid.Column>
          <Icon fitted name='arrow right' size='huge' id="icon"/>
        </Grid.Column> */}
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

// Does nothing at the moment.
function handleClick (type) {
}

/**
 * Should call backend to get patient information. Currently returns static example information.
 */
function getVitals (patientID) {
  // this should be axios call to backend in future
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

// FUNCTION COPIED FROM VitalHistory.js
function GetVitalData (props) {
  return ([
    {
      Value: 85,
      Time: '12:03'
    },
    {
      Value: 83,
      Time: '11:52'
    },
    {
      Value: 86,
      Time: '11:25'
    },
    {
      Value: 84,
      Time: '11:19'
    }
  ]
  )
}

/**
 * creates the full component by mapping over patient-data from backend and applying the generateSegment-function.
 */
const SegmentHorizontalSegments = (props) => (
  <Segment.Group size='mini'>
    {getVitals('__temp__').map(generateSegement)}

{/* TABLE COPIED FROM VitalHistory.js */}
    <Table stackable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign='center'><b>{props.type}</b></Table.HeaderCell>
                    <Table.HeaderCell ></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            {GetVitalData(props).map(MakeTableRow)}

        </Table>
  </Segment.Group>
)

// FUNCTION INSERTED FROM VitalHistory.js
function MakeTableRow (event) {
  return (
        <Table.Row>
            <Table.Cell textAlign='center'><b>{event.Value}</b></Table.Cell>
            <Table.Cell textAlign='center'><b>{event.Time}</b></Table.Cell>
        </Table.Row>
  )
}

export default SegmentHorizontalSegments
