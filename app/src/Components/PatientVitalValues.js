/**
 * Component for the vital parameters on the patient page.
 * Isak Berntsson & Linus Bäckbro Kuusisto
 * Responsible for graphs - Erik Jareman
 * issue #31
 */
import React, { useState } from 'react'
import { Grid, Segment, Header, Table } from 'semantic-ui-react'
import { Chart, Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import './PatientVitalValues.css'
import './VitalHistory.js'
import FilterEvents from './FilterEvents'
Chart.register()

// chartOptions are settings used for chartjs graph
const chartOptions = {
  plugins: {
    datalabels: {
      display: false
    },
    legend: {
      display: false
    }
  },
  maintainAspectRatio: false,
  scale: {
    ticks: {
      precision: 1
    }
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'hour',
        displayFormats: {
          hour: 'HH:mm'
        }
      }
    }
  }
}

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
  function p () {
    console.log(vitals.reference)
    if (vitals.reference === 1) {
      return (<Icon fitted name='arrow up' size='huge' color='red'></Icon>)
    }
    if (vitals.reference === 0) {
      return (<Icon fitted name='arrow right' size='huge' color='green'></Icon>)
    }
    if (vitals.reference === -1) {
      return (<Icon fitted name='arrow down' size='huge' color='red'></Icon>)
    }
  }
  return (
    <>
      {vitals !== undefined
        ? <Segment onClick={() => handleClick(vitals.type)} size='mini'>
          <Grid columns={2}>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column id="leftColumn" textAlign='left'>
                {p()}
                <Header id="typeHeader">
                  {vitals.type}
                </Header>
              </Grid.Column>
              <Grid.Column id="rightColumn" textAlign='right'>
                <Header id="valHeader">
                  {floatOrSplit(vitals.type, vitals.value)}
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

  // getDataset returns a dataset object that can be used as input to chartjs chart.
  // creates datapoints and sets color them
  function getDataset (datapoints, values) {
    const dataset = []
    const backgroundColor = []
    for (let i = 0; i < datapoints.length; i++) {
      if (values === null) {
        dataset.push({ x: new Date('1970-01-01 ' + datapoints[i].time), y: datapoints[i].value })
      } else {
        dataset.push({ x: new Date('1970-01-01 ' + datapoints[i].time), y: values[i] })
      }
      if (datapoints[i].reference === 0) {
        backgroundColor.push('black')
      } else {
        backgroundColor.push('red')
      }
    }
    return (
      {
        data: dataset,
        backgroundColor: backgroundColor,
        pointRadius: 4
      }
    )
  }

  // renderVitalChart returns a chartjs line chart with data for a vital parameter.
  function renderVitalChart (datapoints) {
    const datasets = []
    if (datapoints[0].type === 'Blodtryck') { // add two datasets for 'Blodtryck' (separate value string)
      const lowerValues = []
      const upperValues = []
      for (let j = 0; j < Object.keys(datapoints).length; j++) {
        lowerValues.push(datapoints[j].value.substring(5, 7))
        upperValues.push(datapoints[j].value.substring(1, 3))
      }
      datasets.push(getDataset(datapoints, lowerValues))
      datasets.push(getDataset(datapoints, upperValues))
    } else { // add one dataset for other vital parameter
      datasets.push(getDataset(datapoints, null))
    }
    const chartData = {
      datasets: datasets
    }
    return ( // redraw={ true } fixes chartjs bug (TypeError) when changing data in line chart
    <Table.Row>
      <Line style={{ height: '40vh', width: '100%' }} data={chartData} options={chartOptions} redraw={ true }></Line>
    </Table.Row>
    )
  }

  function safeRender () {
    let i = 0
    const events = []
    const vitalArr = typeToArray(vitalType.get())
    if (vitalType.get() !== undefined) {
      if (typeToArray(vitalType.get()) !== undefined) {
        if (typeToArray(vitalType.get()).length > 0) {
          return renderVitalChart(typeToArray(vitalType.get()))
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
      <Grid.Column>
          {safeRender()}
      </Grid.Column>
    </Grid>
  )
}

function floatOrSplit (type, val) {
  if (type === 'Kroppstemperatur') {
    return parseFloat(val).toFixed(1).toString()
  }
  if (val[0] === '(') {
    const split = val.substring(1).split(',')
    return parseFloat(split[0]).toFixed(0).toString() + ' / ' + parseFloat(split[1]).toFixed(0).toString()
  }
  return parseFloat(val).toFixed(0).toString()
}
