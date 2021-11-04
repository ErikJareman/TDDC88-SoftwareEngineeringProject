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

function TimelineComponent ({ size }) {
  const { timespan } = useTemporaryData()
  const startTime = timespan.start
  const endTime = timespan.end
  const timestamps = getTimeStamps(startTime, endTime)
  const spacingPerTimestamp = getSpacingPerTimestamp(timestamps)

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

      </Grid>
  </div>
  )
}

export default withSize()(TimelineComponent)
