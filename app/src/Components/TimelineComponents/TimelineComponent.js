/**
 * TimelineComponent.js
 *
 * Returns the timeline component (chartjs scatter chart).
 * - Handles logic for first render (populates chartjs-structured dataset with datapoints
 *   for events, current time, timeline bounds)
 * - Re-calculates y-cord for datapoints on zoom
 *
 * function TimelineComponent - Erik Jareman - FINAL
 */

/**
 * NOTE: Behaviour with event times around/close to midnight is a bit buggy.
 * This is due to the event representation using only 'HH:mm:ss.s'-format, and no date.
 * FIX: add complete Date() format to event representation.
 */

 import React, { useEffect, useState, useRef } from 'react'
 import useDatasetStructure from './useDatasetStructure'
 import useChartOptions from './useChartOptions'
 import { Chart, Scatter } from 'react-chartjs-2'
 import 'chartjs-adapter-date-fns'
 import ChartDataLabels from 'chartjs-plugin-datalabels'
 import zoomPlugin from 'chartjs-plugin-zoom'
 Chart.register(zoomPlugin)
 Chart.register(ChartDataLabels)
 let events
 /**
  * reloadOnZoom is called on pinch/scroll (zoom) and updates the y-coord
  * for all datapoints to fit new scale. Uses updateCoordinateY() to do so.
  */
 function reloadOnZoom (context) {
   const timelineWidthPX = context.chart.width
   const minTime = context.chart.scales.x.min
   const maxTime = context.chart.scales.x.max
   events = updateCoordinateY(events, minTime, maxTime, timelineWidthPX)
   for (let j = 0; j < context.chart._sortedMetasets.length - 1; j++) {
     for (let k = 0; k < context.chart._sortedMetasets[j]._dataset.data.length; k++) {
       const uniqueID = context.chart._sortedMetasets[j]._dataset.data[k].id
       context.chart._sortedMetasets[j]._dataset.data[k].y = events[uniqueID].index
     }
   }
   context.chart.update()
 }
 
 /**
  * updateCoordinateY uses timeline bounds and timeline width to calculate if two events
  * in 'events' fit side-by-side. The function sets y-values for all events to make
  * sure no events overlap once rendered.
  */
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
         if (events[i].index >= 5) {
           events[i].index = 6
         }
         break
       }
       const previousEventTime = convertTimeStringToMinutes(sortByValueY[j][sortByValueY[j].length - 1].time)
       const currentEventTime = convertTimeStringToMinutes(events[i].time)
       if (currentEventTime > previousEventTime + eventWidthInMinutes || j === sortByValueY.length - 1) {
         sortByValueY[j].push(events[i])
         events[i].index = j + 1
         if (events[i].index >= 5) {
           events[i].index = 6
         }
         break
       }
     }
   }
   return events
 }
 
 /**
  * initDataPoints populates a dataset with chartjs-adjusted structure before the first render
  * of the timeline. It populates the dataset with datapoints based on events in 'backendEvents',
  * current time, and two datapoints used to set initial width of the timeline.
  */
 function initDataPoints (dataset, backendEvents, initialWidth) {
   function createDataPoint (time, index, uniqueID, label) {
     return { x: new Date('1970-01-01').setHours(time.split(':')[0], time.split(':')[1], time.split(':')[2]), y: index, id: uniqueID, label: label }
   }
 
   function getTimelineBounds (backendEvents, currentTime) {
     let startTime = backendEvents[0].time
     let endTime = backendEvents[backendEvents.length - 1].time
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
   const initialTimespan = getTimelineBounds(backendEvents, currentTime)
   backendEvents = backendEvents.filter(a => (new Date('1970-01-01').setHours(a.time.split(':')[0], a.time.split(':')[1], a.time.split(':')[2]) < currentTime.getTime()) || (a.type === 'Dosering' || a.type === 'Omvardnad'))
   backendEvents = updateCoordinateY(backendEvents, initialTimespan[0], initialTimespan[1], initialWidth)
   for (let i = 0; i < backendEvents.length; i++) {
     for (let j = 0; j < dataset.datasets.length; j++) {
       if (backendEvents[i].type === dataset.datasets[j].label[0] && backendEvents[i].category === dataset.datasets[j].label[2]) {
         dataset.datasets[j].data.push(createDataPoint(backendEvents[i].time, backendEvents[i].index, i, dataset.datasets[j].label[1] + '\n' + backendEvents[i].time.substring(0, 5)))
         break
       }
     }
   }
   dataset.datasets[dataset.datasets.length - 1].data.push({ x: currentTime, y: 0.25, label: '' })
   dataset.datasets[dataset.datasets.length - 1].data.push({ x: new Date(initialTimespan[0]), y: 1, label: '' })
   dataset.datasets[dataset.datasets.length - 1].data.push({ x: new Date(initialTimespan[1]), y: 1, label: '' })
   events = backendEvents
   return dataset
 }
 
 function getData (backendEvents, initialWidth) {
   const { datasetStructure } = useDatasetStructure()
   const dataset = initDataPoints(datasetStructure, backendEvents, initialWidth)
   return dataset
 }
 
 function getOptions () {
   const { options } = useChartOptions(reloadOnZoom)
   return options
 }
 
 export default function TimelineComponent (patient) {
   const [backendEvents, setBackendEvents] = useState(null)
   useEffect(() => {
     fetch('https://backend-c4company.herokuapp.com/patients/' + patient.patient.id + '/events')
       .then(res => {
         return res.json()
       })
       .then(data => {
         const dataSortedByTime = data.sort((a, b) => new Date('1970-01-01 ' + a.time) - new Date('1970-01-01 ' + b.time))
         setBackendEvents(dataSortedByTime)
       })
   }, [])
 
   const targetRef = useRef()
   const [initialWidth, setInitialWidth] = useState(null)
   useEffect(() => {
     if (targetRef.current) {
       setInitialWidth(targetRef.current.offsetWidth)
     }
   }, [])
 
   return (
   <div ref={targetRef} style={{ height: 'calc(25px + 37px + 31vh + 10px)' }}> {/** height based on PatientInfo component */}
     {backendEvents && initialWidth && <Scatter data={getData(backendEvents, initialWidth)} options={getOptions()} />}
   </div>
   )
 }
 
