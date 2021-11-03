/**
 * StartForm.js
 *
 * Component for the starting page where the user can select their role (E.g. Doctor, Nurse, Etc.)
 *
 * WIP
 *
 * Authors Philip Löfgren, Philip Nylén
*/
import regionenLogo from '../assets/regionenLogo.png'
import './StartForm.css'
import React, { useState } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const roleOptions = [
  {
    key: 'Läkare',
    text: 'Läkare',
    value: 'Läkare',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' }
  },
  {
    key: 'Sjuksköterska',
    text: 'Sjuksköterska',
    value: 'Sjuksköterska',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' }
  },
  {
    key: 'Undersköterska',
    text: 'Undersköterska',
    value: 'Undersköterska',
    image: { avatar: true, src: '/images/avatar/small/stevie.jpg' }
  }
]

const hospitalOptions = [
  {
    key: 'Linköping',
    text: 'Linköping',
    value: 'Linköping',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' }
  },
  {
    key: 'Norrköping',
    text: 'Norrköping',
    value: 'Norrköping',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' }
  },
  {
    key: 'Motala',
    text: 'Motala',
    value: 'Motala',
    image: { avatar: true, src: '/images/avatar/small/stevie.jpg' }
  }
]

/**
 * Function StartForm () currently renders a dropdown with alternatives
 * of roles that can be selected. This will determine the information they have access
 * to and also which hospital will be shown in the navbar.
 *
 * Currently not complete - more functionality to be added.
 */

export default function StartForm () {
  const [role, setRole] = useState({ role: '' })
  const [location, setLocation] = useState({ location: '' })

  const saveDetails = (event) => {
    if (role === 'Läkare' || role === 'Sjuksköterska' || role === 'Undersköterska') {
      localStorage.setItem('localRole', role)
    } else {
      localStorage.setItem('localRole', '')
    }

    if (location === 'Linköping' || location === 'Norrköping' || location === 'Motala') {
      localStorage.setItem('localLocation', location)
    } else {
      localStorage.setItem('localLocation', 'Välj din arbetsplats...')
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
          <Dropdown
          id='roles'
          placeholder='Välj roll'
          fluid
          selection
          clearable
          options={roleOptions}
          defaultValue = ''
          onChange = {handleSelectedRole}
          />
          <Dropdown
          placeholder='Välj sjukhus'
          fluid
          selection
          clearable
          options={hospitalOptions}
          onChange = {handleSelectedLocation}
          />
          <Link to = '/home'>
            <Button className='startButton' onClick={saveDetails}>Klicka här</Button>
          </Link>
        </div>
      </div>
  )
}
