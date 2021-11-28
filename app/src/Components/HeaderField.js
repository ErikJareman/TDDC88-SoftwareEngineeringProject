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
import React from 'react'
import axios from 'axios'
import FilterEvents from './FilterEvents'
import { Popup } from 'reactjs-popup'
import { Link } from 'react-router-dom'

function HeaderField (props) {
  const patients = props.patients
  let events
  if (props.events == null && patients != null) {
    events = []
    patients.forEach((patient) => {
      // request to fetch data for currentEvents
      if (JSON.parse(localStorage.getItem('patient' + patient.id)) === true) {
        axios.get('https://backend-c4company.herokuapp.com/patients/' + patient.id + '/events')
          .then(res => {
            if (res.data != null) {
              events.push({ patient: patient, event: FilterEvents({ sortBy: 'time', list: res.data })[0] })
            }
          })
      }
    })
    events.sort((e1, e2) => e1.event.time < e2.event.time)
  } else if (props.events != null) {
    events = []
    FilterEvents({ sortBy: 'time', list: props.events }).forEach((event) => {
      events.push({ patient: props.patient, event: event })
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
