/**
 * HeaderField.js
 *
 * Top header which is constant across all pages
 *
 * function HeaderField() - Philip Nylén - FINAL
 */

import headerLogo from '../assets/headerLogo.png'
import './HeaderField.css'
import NotificationField from './NotificationField'
import React, { useState } from 'react'
import axios from 'axios'
import { Popup } from 'reactjs-popup'
import { Link } from 'react-router-dom'

function HeaderField (props) {
  const [currentEvents, setCurrentEvents] = useState([])

  const patients = props.patients
  let events = props.events
  if (events == null && patients != null) {
    events = []
    patients.some((patient) => {
      // request to fetch data for currentEvents
      axios.get('https://backend-c4company.herokuapp.com/patients/' + patient.id + '/events')
        .then(res => {
          setCurrentEvents(res.data)
        })
      currentEvents.forEach((event) => {
        events.push({ patient: patient, event: event })
      })
      return (events.length < 20)
    })
  }
  const clearLocal = () => {
    // localStorage.clear()
    localStorage.removeItem('localRole')
    localStorage.removeItem('localLocation')
    localStorage.removeItem('locationText')
  }

  let notifications = <></>
  if (props.notifications == null || props.notifications) {
    notifications =
      <a className="linkarea">
        <i className="bell big icon header-icon"></i>
      </a>
  }

  return (
    <div id="headerArea">
      <Link id="linkarea2" to = '/home'>
        <img src={headerLogo} className="header-logo" alt="Not found" />
      </Link>
      <Link id="linkarea3" to = '/home'>
        <h1 id="headerText"> {localStorage.getItem('locationText')}</h1>
      </Link>
      <div id="icon-field">
        <Popup trigger={notifications} position='bottom right'>
          <NotificationField events={events} />
        </Popup>
        <Link className="linkarea" to='/'>
          <i className='sign-in alternate big icon header-icon' onClick={clearLocal}></i>
        </Link>
      </div>
    </div>
  )
}

export default HeaderField
