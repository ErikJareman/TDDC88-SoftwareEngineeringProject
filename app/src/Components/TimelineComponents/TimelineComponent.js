/**
 * TimelineComponent.js
 *
 * Author: Erik Jareman - DRAFT
 *
 * This component handles the rendering of the timeline
 * It controls the rendering and uses logic from
 * useIconSelector.js, useTemporaryData.js (I think I will separate the code more once
 * more functionality is added, then more files will be added here)
 *
 * Bad documentation, but only a first draft.
 */

import React from 'react'
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { withSize } from 'react-sizeme'
import './Timeline.css'
import useTemporaryData from './useTemporaryData'
import useIconSelector from './useIconSelector'

function getSpacingPerTimestamp (timestamps) {
  return 100 / timestamps.length
}

function getEndTime (events) {
  const lastEventTime = events[events.length - 1].time.split(':')
  return +lastEventTime[0] + 1
}

function getTimeStamps (startTime, endTime) {
  const timestamps = []
  for (let i = parseInt(startTime); i < (parseInt(endTime) + 1); i++) {
    timestamps.push(i)
  }
  return timestamps
}

function getTimelineSpacings (spacingPerTimestamp) {
  const spacings = []
  for (let i = spacingPerTimestamp; i < 100; i += spacingPerTimestamp) {
    spacings.push(spacingPerTimestamp)
  }
  spacings.unshift(spacingPerTimestamp / 2)
  return spacings
}

function getStructuredEventArray (events, timestamps, windowWidth, eventWidth) {
  function getNumberOfColumns () {
    let numberOfColumns = 0
    while ((numberOfColumns + 1) * eventWidth < windowWidth - (windowWidth * 0.05)) { // '- (windowsWidth * 0.05)' to allow for min 2.5% space on each side
      numberOfColumns += 1
    }
    return numberOfColumns
  }

  function convertTimeToMinutes (timeString) {
    const timeArray = timeString.split(':')
    return +(timeArray[0] * 60) + +timeArray[1]
  }

  const numberOfColumns = getNumberOfColumns()
  const minutesPerColumn = (timestamps[timestamps.length - 1] - timestamps[0]) * 60 / numberOfColumns
  const startMinute = timestamps[0] * 60
  const structuredEventArray = []
  let timeRef = startMinute
  let eventIndexRef = 0
  let currentEventTimeInMinutes = convertTimeToMinutes(events[eventIndexRef].time)

  for (let i = 0; i < numberOfColumns; i++) {
    structuredEventArray.push([])
    while (currentEventTimeInMinutes < timeRef + minutesPerColumn && currentEventTimeInMinutes >= timeRef) {
      structuredEventArray[i].push(events[eventIndexRef])
      if (eventIndexRef === events.length - 1) { // TODO add better solution later
        break
      }
      eventIndexRef += 1
      currentEventTimeInMinutes = convertTimeToMinutes(events[eventIndexRef].time)
    }
    timeRef += minutesPerColumn
  }
  return structuredEventArray
}

function TimelineComponent ({ size }) {
  const { events } = useTemporaryData()
  const { getIcon } = useIconSelector()
  const startTime = events[0].time
  const endTime = getEndTime(events)
  const timestamps = getTimeStamps(startTime, endTime)
  const spacingPerTimestamp = getSpacingPerTimestamp(timestamps)
  const maxEventWidth = 40 // the maximum width given to each event-row displayed under the timeline, pixels
  const structuredEventArray = getStructuredEventArray(events, timestamps, size.width, maxEventWidth)
  // console.log('structuredEventArray: ' + structuredEventArray)
  return (
    <div>
      <h1>
        Timeline
      </h1>

      <Grid className='timeline'>

        <Grid.Row className='timestamp-row'>{/* This grid-row displays all timestamps */}
          {timestamps.map((hour, index) => {
            return (
              <Grid.Column key={index} style={{ width: `${spacingPerTimestamp}%` }}>
                {hour}
              </Grid.Column>
            )
          })}
        </Grid.Row>

        <Grid.Row className='line-row'>{/* This grid-row displays the actual line of the timeline */}
          {getTimelineSpacings(spacingPerTimestamp).map((columnWidth, index) => {
            return (
              <Grid.Column key={index} className={`${index === 0 ? 'timeline-adjust-left' : 'timeline-adjust-center'}`} style={{ width: `${columnWidth}%` }} />
            )
          })}
        </Grid.Row>

        <Grid.Row className='event-row'>{/* This grid-row displays all events that are in the span of the timeline */}
          <Grid.Column className='no-padding' style={{ width: `${(size.width - ((structuredEventArray.length) * maxEventWidth)) / 2}px` }} />
          {structuredEventArray.map((column, index) => {
            return (
              <Grid.Column className='no-padding center-all' key={index} style={{ width: maxEventWidth }}>
                {structuredEventArray[index].map((event, innerIndex) => {
                  return (
                    <div key={innerIndex}>
                      <Grid.Row>
                        <img className='icon-img' src={getIcon(event.name)} alt='Not Found' />
                      </Grid.Row>
                      <Grid.Row className='event-text-adjust'>
                        {event.name}
                      </Grid.Row>
                      <Grid.Row className='event-text-adjust'>
                        {event.time}
                      </Grid.Row>
                    </div>
                  )
                })}
              </Grid.Column>
            )
          })}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default withSize()(TimelineComponent)
