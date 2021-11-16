/**
 * NOTE: Behaviour with event times around/close to midnight is a bit buggy.
 * This is due to the early event representation of time using only 'HH:mm'-format, and no date.
 * FIX: Replace all 'HH:mm' representations of time with Date objects (new Date()).
 */
import React from 'react'
import useDatasetStructure from './useDatasetStructure'
import useChartOptions from './useChartOptions'
import useTemporaryData from './useTemporaryData.js'
import { Chart, Scatter } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import zoomPlugin from 'chartjs-plugin-zoom'

Chart.register(zoomPlugin)
Chart.register(ChartDataLabels)
let { events } = useTemporaryData() // assumes events array sorted by time

function reloadOnZoom (context) {
  const timelineWidthPX = context.chart.width
  const minTime = context.chart.scales.x.min
  const maxTime = context.chart.scales.x.max
  events = updateCoordinateY(events, minTime, maxTime, timelineWidthPX)
  for (let j = 0; j < context.chart._sortedMetasets.length - 1; j++) {
    for (let k = 0; k < context.chart._sortedMetasets[j]._dataset.data.length; k++) {
      const uniqueID = context.chart._sortedMetasets[j]._dataset.data[k].id
      if (events[uniqueID].index === 5) { // Bad temporary solution. Used to completely hide events that...
        events[uniqueID].index = 6 // ...do not fit on timeline. Should be replaced with better solution.
      }
      context.chart._sortedMetasets[j]._dataset.data[k].y = events[uniqueID].index
    }
  }
  context.chart.update()
}

function updateCoordinateY (events, startTime, endTime, timelineWidthPX) {
  function convertTimeStringToMinutes (timeString) {
    const timeArray = timeString.split(':')
    return +(timeArray[0] * 60) + +timeArray[1]
  }
  const eventWidthPX = 40
  const timelineWidthInMilliseconds = endTime - startTime
  const eventWidthInMilliseconds = (eventWidthPX / timelineWidthPX) * timelineWidthInMilliseconds
  const eventWidthInMinutes = eventWidthInMilliseconds / (1000 * 60)
  const sortByValueY = [[], [], [], [], []]

  for (let i = 0; i < events.length; i++) {
    for (let j = 0; j < sortByValueY.length; j++) {
      if (sortByValueY[j].length === 0) {
        sortByValueY[j].push(events[i])
        events[i].index = j + 1
        break
      }
      const previousEventTime = convertTimeStringToMinutes(sortByValueY[j][sortByValueY[j].length - 1].time)
      const currentEventTime = convertTimeStringToMinutes(events[i].time)
      if (currentEventTime > previousEventTime + eventWidthInMinutes || j === sortByValueY.length - 1) { // if current event fits next to previous event on same y
        sortByValueY[j].push(events[i])
        events[i].index = j + 1
        break
      }
    }
  }
  return events
}

function getDataPoints (data, events) {
  function createDataPoint (time, index, uniqueID, label) {
    return { x: new Date('1970-01-01 ' + time), y: index, id: uniqueID, label: label }
  }

  function getTimelineBounds (events, currentTime) {
    let startTime = events[0].time
    let endTime = events[events.length - 1].time
    startTime = (parseInt(startTime) - 1) * 60 * 60 * 1000 - 10 * 60 * 1000
    endTime = (parseInt(endTime) - 1) * 60 * 60 * 1000 + 10 * 60 * 1000
    currentTime = currentTime.getTime()
    if (currentTime < startTime) {
      startTime = currentTime - 10 * 60 * 1000
    } else if (currentTime > endTime) {
      endTime = currentTime + 10 * 60 * 1000
    }
    return [startTime, endTime]
  }
  const currentTime = new Date()
  currentTime.setYear(1970)
  currentTime.setMonth(0)
  currentTime.setDate(1)
  const initialTimespan = getTimelineBounds(events, currentTime)
  const initialWidth = 1000 // TODO get initial width in pixels
  events = updateCoordinateY(events, initialTimespan[0], initialTimespan[1], initialWidth)
  for (let i = 0; i < events.length; i++) {
    for (let j = 0; j < data.datasets.length; j++) {
      if (events[i].name === data.datasets[j].label) {
        data.datasets[j].data.push(createDataPoint(events[i].time, events[i].index, i, events[i].name + '\n' + events[i].time))
        break
      }
    }
  }
  data.datasets[data.datasets.length - 1].data.push({ x: currentTime, y: 0.25, label: '' })
  data.datasets[data.datasets.length - 1].data.push({ x: new Date(initialTimespan[0]), y: 1, label: '' })
  data.datasets[data.datasets.length - 1].data.push({ x: new Date(initialTimespan[1]), y: 1, label: '' })
  return data
}

function getData () {
  const { datasetStructure } = useDatasetStructure()
  const dataset = getDataPoints(datasetStructure, events)
  return dataset
}

function getOptions () {
  const { options } = useChartOptions(reloadOnZoom)
  return options
}

const TimelineComponent = () => (
  <div style={{ height: '327px' }}> {/* TODO get actual height available */}
    <h1 style={{ margin: 0 }}>Timeline</h1>
    <Scatter data={getData()} options={getOptions()} />
  </div>
)

export default TimelineComponent
