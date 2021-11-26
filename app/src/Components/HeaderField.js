/**
 * HeaderField.js
 *
 * Top header which is constant across all pages
 *
 * function HeaderField() - Philip Nylén - FINAL
 */

import headerLogo from '../assets/headerLogo.png'
import './HeaderField.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default function HeaderField () {
  const clearLocal = () => {
    // localStorage.clear()
    localStorage.removeItem('localRole')
    localStorage.removeItem('localLocation')
    localStorage.removeItem('locationText')
  }

  return (
    <div id="headerArea">
      <Link id="linkarea2" to = '/home'>
        <img src={headerLogo} className="header-logo" alt="Not found" />
      </Link>
      <Link id="linkarea3" to = '/home'>
        <h1 id="headerText"> {localStorage.getItem('locationText')}</h1>
      </Link>
      <Link id="linkarea" to = '/'>
        <i className='sign-in alternate big icon' id='signin' onClick={clearLocal}></i>
      </Link>
    </div>
  )
}
