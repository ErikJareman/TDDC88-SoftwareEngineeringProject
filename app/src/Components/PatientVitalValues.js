/**
 * Component for the vital parameters on the patient page.
 * Isak Berntsson & Linus Bäckbro Kuusisto
 * issue #31
 */
import React, { useState } from 'react'
import { Grid, Segment, Header, Table } from 'semantic-ui-react'
import './PatientVitalValues.css'
import './VitalHistory.js'

// vitalType is the the vital parameter that the user has pressed on, resulting in a table of historic values in the vital values component
const vitalType = {
  vitalTypeVal: sessionStorage.getItem('vitalKey'),

  set (newVal) {
    this.vitalTypeVal = newVal
  },
  get () {
    return this.vitalTypeVal
  }
}

/**
 * Function that generates segment for one patient vital-value.
 */
function generateSegement (vitals) {
  return (
  <Segment onClick={() => handleClick(vitals.type)} size='mini'>
    <Grid columns={2}>
      <Grid.Row verticalAlign='middle'>
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
 * Gets the vital type that the user has pressed on and saves it in vitalType.
 */
function handleClick (type) {
  vitalType.set(type)
  sessionStorage.setItem('vitalKey', vitalType.vitalTypeVal)
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
function GetVitalData (type) {
  if (type === 'ANDNING') {
    return ([
      {
        Value: 12,
        Time: '12:03'
      },
      {
        Value: 14,
        Time: '11:52'
      },
      {
        Value: 13,
        Time: '11:25'
      },
      {
        Value: 11,
        Time: '11:19'
      }
    ])
  } else if (type === 'PULS') {
    return ([
      {
        Value: 80,
        Time: '12:03'
      },
      {
        Value: 79,
        Time: '11:52'
      },
      {
        Value: 65,
        Time: '11:25'
      },
      {
        Value: 67,
        Time: '11:19'
      }
    ])
  } else {
    return ([])
  }
}

/**
 * creates the full component by mapping over patient-data from backend and applying the generateSegment-function.
 */
export default function VitalValuesComponent () {
  const [val, setValue] = useState(0)

  return (
    <Grid columns={2} onClick={() => setValue(val + 1)}>
      <Grid.Column>
        {getVitals('__temp__').map(generateSegement)}
      </Grid.Column>

      <Grid.Column stretched>
        <Table stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'><b>{vitalType.get()}</b></Table.HeaderCell>
              <Table.HeaderCell ></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {GetVitalData(vitalType.get()).map(MakeTableRow)}

        </Table>
      </Grid.Column>
    </Grid>
  )
}

function MakeTableRow (event) {
  return (
        <Table.Row>
            <Table.Cell textAlign='center'><b>{event.Value}</b></Table.Cell>
            <Table.Cell textAlign='center'><b>{event.Time}</b></Table.Cell>
        </Table.Row>
  )
}
