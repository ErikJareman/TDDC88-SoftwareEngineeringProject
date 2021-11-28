/**
 * Function to calculate time left before patient need attention.
 *
 * David Råsberg and Gustav, inspiration drawn from this https://github.com/do-community/react-hooks-timer/blob/master/src/App.js
 *
 * 2021-11-5: Works to functional requirements, but results in "warning".
 *
 * 2021-11-11: Works. Does not use data from back-end yet, but only requires minor change to do so.
 *
 * 2021-11-12: Takes triageLevel from back-end. But timeLastChecked is still (pseudo-)randomly generated in component.
 *
 */

import React, { useEffect, useState } from 'react'
import exclamation from '../assets/exclamation.png'

// Time corresponding to triageLevels
const triageTimes = [0, 20, 15, 10, 5]

/* const calcTimeChecked = (triageTime) => {
  return new Date(Date.now() - triageTime * 60 * 1000 + Math.floor(Math.random() * triageTime * 60 * 1000))
} */

export default function TriageTimeLeft (props) {
  const [triageTime] = useState(triageTimes[props.triageLevel])

  // Function to turn time in string format to date object
  const timeStringToDate = (timeString) => {
    const timeArr = timeString.split(':')
    return (new Date(2021, 10, 28, timeArr[0], timeArr[1], timeArr[2]))
  }
  // Change hard-coded time to => props.lastChecked when available on heroku
  const [timeChecked] = useState(timeStringToDate('21:09:00'))

  let checkPatientNowWarning = false
  // Calculates time to check on patient.
  const calculateTimeToCheck = (timeChecked) => {
    return (new Date(Date.parse(timeChecked) + (triageTime * 60 * 1000)))
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
    timerComponents = [<img key='icon' id='exclamation' src={exclamation}></img>, '  -  ', ...timerComponents]
  };
  return (
    <>
      {timerComponents}
    </>
  )
}
