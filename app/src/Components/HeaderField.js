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
  return (
    <div id="headerArea">
      <img src={headerLogo} className="header-logo" alt="Not found" />
      <h1 id="headerText"> {localStorage.getItem('localLocation')}</h1>
      <Link to = '/'>
       <i className='sign-in alternate big icon' id='sign-in'></i>
      </Link>
    </div>
  )
}
