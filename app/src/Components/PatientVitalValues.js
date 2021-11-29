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
import NoValueInfo from './NoValueInfo'

// vitalType is the the vital parameter that the user has pressed on, resulting in a table of historic values in the vital values component
const vitalType = {
  vitalTypeVal: sessionStorage.getItem('vitalKey'),

  set (newVal) {
    this.vitalTypeVal = newVal
  },
  get () {
    if (this.vitalTypeVal !== undefined) {
      return this.vitalTypeVal
    } else {
      console.log('inget värde!!!!!')
    }
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
                  {floatOrSplit(vitals.value)}
                </Header>
                <Header id="timeHeader">
                  {vitals.time.substring(0, 5)}
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        : <NoValueInfo />}
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
  let mostRecent = [pulse[0], temperature[0], pressure[0], breathFreq[0]]
  // removes undefines values
  mostRecent = mostRecent.filter((instance) => {
    return instance !== undefined
  })

  // function to return array based on type in swedish. Can probably be solved in a better way.
  function typeToArray (type) {
    let result = []
    if (type !== undefined) {
      const trans = { Puls: pulse, Kroppstemperatur: temperature, Blodtryck: pressure, Andningsfrekvens: breathFreq }
      result = trans[type]
      return result
    }
    return result
  }

  function safeRender () {
    let i = 0
    const events = []
    const vitalArr = typeToArray(vitalType.get())
    if (vitalType.get() !== undefined) {
      if (vitalArr !== undefined) {
        if (vitalArr.length > 0) {
          while (i < 4 && i < vitalArr.length) {
            events.push(MakeTableRow(vitalArr[i]))
            i += 1
          }
          return (events)
        }
      }
    }
  }

  return (
    <Grid columns={2} onClick={() => setValue(val + 1)}>
      <Grid.Column>
        {mostRecent.length > 0
          ? mostRecent.map((type) => {
            return (generateSegement(type))
          })
          : 'No values'}
      </Grid.Column>

      <Grid.Column stretched>
        <Table stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center' ><b>{vitalType.get()}</b></Table.HeaderCell>
              <Table.HeaderCell ></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {/*   SHOULD ONLY BE ONE LINE LATER */}
          {/* {vitalType.get() !== undefined ? typeToArray(vitalType.get()).map(MakeTableRow) : 'No values'}
          {vitalType.get() !== undefined ? typeToArray(vitalType.get()).map(MakeTableRow) : 'No values'}
          {vitalType.get() !== undefined ? typeToArray(vitalType.get()).map(MakeTableRow) : 'No values'}
          {vitalType.get() !== undefined ? typeToArray(vitalType.get()).map(MakeTableRow) : 'No values'} */}
          {safeRender()}
        </Table>
      </Grid.Column>
    </Grid>
  )
}

function floatOrSplit (val) {
  if (val[0] === '(') {
    const split = val.substring(1).split(',')
    return parseFloat(split[0]).toFixed(2).toString() + ' - ' + parseFloat(split[1]).toFixed(2).toString()
  }
  return parseFloat(val).toFixed(2).toString()
}

function MakeTableRow (event) {
  return (
    <Table.Row className="detailInfoClass">
      <Table.Cell id="detailedInfoID">
        <Table.Cell id="detailedValue"><b>{floatOrSplit(event.value)}</b></Table.Cell>
        <Table.Cell id="detailedTime"><b>{event.time.substring(0, 5)}</b></Table.Cell>
      </Table.Cell>
    </Table.Row>
  )
}
