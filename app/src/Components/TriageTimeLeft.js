/**
 * Function to calculate time left before patient need attention.
 *
 * David Råsberg and Gustav, inspiration drawn from this https://github.com/do-community/react-hooks-timer/blob/master/src/App.js
 *
 * 2021-11-5: Works to functional requirements, but results in "warning".
 *
 */

import React, { useEffect, useState } from 'react'
import { Icon } from 'semantic-ui-react'

const triage = { green: 15, yellow: 10, red: 5 }
const triageColors = ['green', 'yellow', 'red']

const calcTimeChecked = (triageColor) => {
  return new Date(Date.now() - ((triage[triageColor] - Math.floor(Math.random() * triage[triageColor]) - 1) * 60 * 1000))
}

export default function TriageTimeLeft (props) {
  // triageColor will probably be part of props in the future
  const [triageColor] = useState(triageColors[Math.floor(Math.random() * Object.keys(triage).length)])
  const [timeChecked] = useState(calcTimeChecked(triageColor))
  let checkPatientNowWarning = false
  // Calculates time to check on patient.
  const calculateTimeToCheck = (timeChecked) => {
    return (new Date(Date.parse(timeChecked) + (triage[triageColor] * 60 * 1000)))
  }

  // Time to check on patient next time
  const [timeToCheck] = useState(calculateTimeToCheck(timeChecked))

  const calculateTimeLeft = (timeToCheck) => {
    const now = Date.now()
    let timeLeft
    if ((timeToCheck - now) > 0) {
      timeLeft = new Date(timeToCheck - now)
    } else {
      checkPatientNowWarning = true
      timeLeft = new Date(now - timeToCheck)
    }

    const timeLeftMap = {
      minutes: timeLeft.getMinutes(),
      seconds: timeLeft.getSeconds()
    }
    return timeLeftMap
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(timeToCheck))

  // useEffect will fire after each render and update
  useEffect(() => {
    let isMounted = true
    setTimeout(() => {
      if (isMounted) {
        setTimeLeft(calculateTimeLeft(timeToCheck))
      }
    }, 1000)
    return () => { isMounted = false }
  })

  let timerComponents = []

  // loop over each property in timeLeft
  Object.keys(timeLeft).forEach((interval, index) => {
    timerComponents.push(
      <span key={index}>
        {timeLeft[interval] < 10 ? '0' : ''}
        {interval === 'seconds' ? timeLeft[interval] : timeLeft[interval] + ':'}
      </span>
    )
  })

  if (checkPatientNowWarning) {
    timerComponents = [<Icon key={'icon_' + timeChecked} name='warning' color='red' />, '-', ...timerComponents]
  };
  return (
    <>
      {timerComponents}
    </>
  )
}
