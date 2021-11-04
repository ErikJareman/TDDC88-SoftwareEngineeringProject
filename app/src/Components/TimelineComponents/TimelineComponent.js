import React from 'react'
import { Grid } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { withSize } from 'react-sizeme'
import './Timeline.css'
import useTemporaryData from './useTemporaryData'

function getSpacingPerTimestamp (timestamps) {
  return 100 / timestamps.length
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
    while ((numberOfColumns + 1) * eventWidth < windowWidth - 100) { // - 100 for minimum 50 px margin per side
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
      if (eventIndexRef === events.length - 1) { // find better solution if time
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
  const { timespan, events } = useTemporaryData()
  const startTime = timespan.start
  const endTime = timespan.end
  const timestamps = getTimeStamps(startTime, endTime)
  const spacingPerTimestamp = getSpacingPerTimestamp(timestamps)
  const maxEventWidth = 50
  const structuredEventArray = getStructuredEventArray(events, timestamps, size.width, maxEventWidth)
  console.log('structuredEventArray: ' + structuredEventArray)
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
                {hour}:00
              </Grid.Column>
            )
          })}
        </Grid.Row>

        <Grid.Row className='line-row'>{/* This grid-row displays the actual line of the timeline */}
          {getTimelineSpacings(spacingPerTimestamp).map((columnWidth, index) => {
            return (
              <Grid.Column key={index} className={`${index === 0 ? 'timeline-adjust-left' : 'timeline-adjust-center'}`} style={{ width: `${columnWidth}%` }}/>
            )
          })}
        </Grid.Row>

        <Grid.Row className='event-row'>{/* This grid-row displays all events that are in the span of the timeline */}
        <Grid.Column style={{ width: `${(size.width - ((structuredEventArray.length) * maxEventWidth)) / 2}px` }}/>
          {console.log(('size.width ' + size.width))}
          {console.log(('structuredEventArray.length ' + structuredEventArray.length))}
          {console.log(('maxEventWidth: ' + maxEventWidth))}
          {structuredEventArray.map((column, index) => {
            return (
              <Grid.Column className='no-padding center-all' key={ index } style={{ width: maxEventWidth }}>
                {structuredEventArray[index].map((event, innerIndex) => {
                  return (
                  <div key={ innerIndex }>
                    <Grid.Row>
                      <img className= 'icon-img' src='https://d1icd6shlvmxi6.cloudfront.net/gsc/CLPXOJ/66/67/30/6667306b94d94ad19f05c1eb62a997bd/images/patient/u121.svg?token=0e4033e0c8ab4a43d9cbdd109161d3dc7db41a734c1987228bcfcd0891e547dc&amp;pageId=26d44273-03b4-4f41-a27c-d32bdf6f2b8d' alt='Not Found' />
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
