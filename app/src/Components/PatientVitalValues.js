/**
 * Component for the vital parameters on the patient page.
 * Isak Berntsson & Linus Bäckbro Kuusisto
 * issue #31
 */
import React, { useState } from 'react'
import { Grid, Segment, Header, Table } from 'semantic-ui-react'
import './PatientVitalValues.css'
import './VitalHistory.js'
import FilterEvents from './FilterEvents'

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
    <>
      {vitals !== undefined
        ? <Segment onClick={() => handleClick(vitals.type)} size='mini'>
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
        : 'Ingen data tillgänglig'}
    </>
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
 * creates the full component by mapping over patient-data from backend and applying the generateSegment-function.
 */
export default function VitalValuesComponent (props) {
  const [val, setValue] = useState(0)
  // every vital from backend
  const vitals = props.vitals

  // vitals broken down into the different types
  const pulse = FilterEvents({ list: vitals, filterField: 'type', filterBy: 'Puls', sortBy: 'time' })
  const temperature = FilterEvents({ list: vitals, filterField: 'type', filterBy: 'Kroppstemperatur', sortBy: 'time' })
  const pressure = FilterEvents({ list: vitals, filterField: 'type', filterBy: 'Blodtryck', sortBy: 'time' })
  const breathFreq = FilterEvents({ list: vitals, filterField: 'type', filterBy: 'Andningsfrekvens', sortBy: 'time' })

  // array containing the other arrays
  const mostRecent = [pulse[0], temperature[0], pressure[0], breathFreq[0]]

  // function to return array based on type in swedish. Can probably be solved in a better way.
  function typeToArray (type) {
    if (type !== undefined) {
      const trans = { Puls: pulse, Kroppstemperatur: temperature, Blodtryck: pressure, Andningsfrekvens: breathFreq }
      return trans[type]
    }
  }

  return (
    <Grid columns={2} onClick={() => setValue(val + 1)}>
      <Grid.Column>
        {mostRecent.map((type) => {
          return (generateSegement(type))
        })}
      </Grid.Column>

      <Grid.Column stretched>
        <Table stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'><b>{vitalType.get()}</b></Table.HeaderCell>
              <Table.HeaderCell ></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {/*   SHOULD ONLY BE ONE LINE LATER */}
          {typeToArray(vitalType.get()).map(MakeTableRow)}
          {typeToArray(vitalType.get()).map(MakeTableRow)}
          {typeToArray(vitalType.get()).map(MakeTableRow)}
          {typeToArray(vitalType.get()).map(MakeTableRow)}
        </Table>
      </Grid.Column>
    </Grid>
  )
}

function MakeTableRow (event) {
  return (
    <Table.Row>
      <Table.Cell textAlign='center'><b>{event.value}</b></Table.Cell>
      <Table.Cell textAlign='center'><b>{event.time}</b></Table.Cell>
    </Table.Row>
  )
}
