/**
 * LoginForm.js
 *
 * function LoginForm({ Login, error }) - Erik Jareman - DRAFT
 *
 * Documentation not complete.
 */

import React, { useState } from 'react'
import regionenLogo from '../assets/regionenLogo.png'
import './LoginForm.css'

/**
 * LoginForm() contains all markup and logic needed for the LoginForm component.
 * Erik Jareman
 * DRAFT
 */
export default function LoginForm ({ Login, error }) {
  const [details, setDetails] = useState({ userID: '', password: '' })
  const submitHandler = (e) => {
    e.preventDefault()
    Login(details)
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='form-inner'>
        <img src={regionenLogo} className='regionen-logo' alt='Not found' />
        <div className='form-group'>
          <label htmlFor='userID'>Konto-Nummer</label>
          <input
            type='text'
            name='userID'
            id='userID'
            placeholder='123'
            onChange={(e) => setDetails({ ...details, userID: e.target.value })}
            value={details.name}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Lösenord</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='admin'
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.name}
          />
        </div>
        {error !== '' ? <div className='error'>{error}</div> : ''}
        <input type='submit' value='Sign In' />
      </div>
    </form>
  )
}
