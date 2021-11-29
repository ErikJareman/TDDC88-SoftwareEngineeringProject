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
    const timeAsDate = new Date()
    timeAsDate.setHours(timeArr[0])
    timeAsDate.setMinutes(timeArr[1])
    timeAsDate.setSeconds(timeArr[2])
    return timeAsDate
  }

  const lastChecked = timeStringToDate(props.lastChecked)
  // Calculates time to check on patient.
  const calculateTimeToCheck = (timeChecked) => {
    return (new Date(Date.parse(timeChecked) + (triageTime * 60 * 1000)))
  }

  // if lastChecked is in future, move back in time enough so that its within the triage time our at most 40 mins ago
  const checkValidTime = (time) => {
    const timeToCheck = calculateTimeToCheck(time)
    // låt den gå ner till - 40 min
    if (time - Date.now() > 0) {
      // which one of these?
      time = new Date(Date.parse(time) - (triageTime + 40) * 1000 * 60 * (1 + parseInt((time - Date.now()) / ((40 + triageTime) * 60 * 1000))))
      // time = new Date(Date.parse(time) - 40 * 1000 * 60 * (1 + parseInt((time - Date.now()) / (40 * 60 * 1000))))

      // if last checked more than 40 mins ago, reset from triageTime
    } else if (Date.now() - timeToCheck > 40 * 60 * 1000) {
      // how many 40 minutes ago should we have checked?
      // Parse as int and add that many
      time = new Date(Date.parse(timeToCheck) + 40 * 1000 * 60 * (parseInt((Date.now() - timeToCheck) / (40 * 60 * 1000))))
    }
    return time
  }
  const [timeChecked] = useState(checkValidTime(lastChecked))

  let checkPatientNowWarning = false

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
