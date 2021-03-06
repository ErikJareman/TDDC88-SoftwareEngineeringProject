/**
 * StartForm.js
 *
 * Component for the starting page where the user can select their role (E.g. Doctor, Nurse, Etc.)
 *
 * FINAL
 *
 * Authors Philip Löfgren, Philip Nylén, Marcus Alvebro
*/
import regionenLogo from '../assets/regionenLogo.png'
import './StartForm.css'
import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const roleOptions = [
  {
    key: 'Läkare',
    text: 'Läkare',
    value: 'Läkare'
  },
  {
    key: 'Sjuksköterska',
    text: 'Sjuksköterska',
    value: 'Sjuksköterska'
  },
  {
    key: 'Undersköterska',
    text: 'Undersköterska',
    value: 'Undersköterska'
  }
]

const hospitalOptions = [
  {
    key: 'Linköping',
    text: 'Linköping',
    value: 'Linköping'
  },
  {
    key: 'Norrköping',
    text: 'Norrköping',
    value: 'Norrköping'
  },
  {
    key: 'Motala',
    text: 'Motala',
    value: 'Motala'
  }
]

/**
 * Function StartForm () currently renders a dropdown with alternatives
 * of roles that can be selected. This will determine the information they have access
 * to and also which hospital will be shown in the navbar.
 */

export default function StartForm () {
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')

  const saveDetails = (event) => {
    if (role === 'Läkare' || role === 'Sjuksköterska' || role === 'Undersköterska') {
      localStorage.setItem('localRole', role)
    } else {
      localStorage.setItem('localRole', '')
    }

    if (location === 'Linköping' || location === 'Norrköping' || location === 'Motala') {
      localStorage.setItem('localLocation', location)
    } else {
      localStorage.setItem('localLocation', '')
    }
  }

  const handleSelectedRole = (event, data) => {
    setRole(data.value)
  }

  const handleSelectedLocation = (event, data) => {
    setLocation(data.value)
  }

  return (
      <div className='start'>
        <div className='start_container'>
          <img src={regionenLogo} className='regionen-logo' alt='Not found' />
          <Form>
          <Form.Select
          className='roles'
          label ='Roll'
          placeholder='Välj en roll'
          fluid
          selection
          clearable
          options={roleOptions}
          onChange = {handleSelectedRole}
          />
          <Form.Select
          className='locations'
          label='Sjukhus'
          placeholder='Välj ett sjukhus'
          fluid
          selection
          clearable
          options={hospitalOptions}
          onChange = {handleSelectedLocation}
          />
          {
            role !== '' && location !== ''
              ? <Link to = '/home'><Button className='startButton' onClick={saveDetails}>Logga in</Button></Link>
              : <Link to = '/'><Button className='startButton' disabled onClick={saveDetails}>Logga in</Button></Link>
          }
          </Form>
        </div>
      </div>
  )
}
