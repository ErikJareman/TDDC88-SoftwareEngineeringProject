/**
 * PatientNavList.js
 *
 * function PatientNavList() - Philip Nylén, Erik Jareman - FINAL
 */
import './PatientNavList.css'
import { Link } from 'react-router-dom'
import TriageTimeLeft from './TriageTimeLeft'
import React from 'react'
import checkbox from '../assets/checkbox.png'
import checkboxselected from '../assets/checkboxselected.png'
import { Icon } from 'semantic-ui-react'

/**
 * The function PatientNavList renders the list of patients
 * Philip Nylén, Erik Jareman
 * FINAL
 * Notification functionality added - Nikil
 */
function PatientNavList (props) {
  /**
  * The below snippet is done
  * Philip Nylén
  * FINAL
  */
  const triageColors = ['green', 'yellow', 'orange', 'red']

  const patients = props.patients
  console.log(patients)

  const handleChange = (id) => {
    const Notif = JSON.parse(localStorage.getItem('patient' + id))
    if (Notif === true) {
      localStorage.setItem('patient' + id, false)
    } else {
      localStorage.setItem('patient' + id, true)
    }
  }

  const changeActive = (teamNo) => {
    console.log(teamNo)
    const isDisplayed = JSON.parse(localStorage.getItem('displayTeam' + teamNo))
    if (isDisplayed === true) {
      localStorage.setItem('displayTeam' + teamNo, false)
    } else {
      localStorage.setItem('displayTeam' + teamNo, true)
    }
    window.location.href = window.location
  }

  const booleanToArrow = { true: 'caret down', false: 'caret right' }
  let index = 0

  return (
    <ul>
      {patients.map((patient) => {
        // If the patient belongs to a team number higher than current index, a dropdown button is added for that team
        if (patient.team > index) {
          index += 1
          // Checks if the user has chosen to display the team
          if (JSON.parse(localStorage.getItem('displayTeam' + patient.team)) === true) {
            return (
              <>
                <div key={patient.id + patient.name} className="divideContainer">
                  {
                    index === 1
                      ? <button className="teams" type="submit" onClick={() => { changeActive(1) }}>TEAM {index}<Icon name={booleanToArrow[JSON.parse(localStorage.getItem('displayTeam' + 1))]} size='large' /></button>
                      : (index === 2
                        // eslint-disable-next-line indent
                        ? <button className="teams" type="submit" onClick={() => { changeActive(2) }}>TEAM {index}<Icon name={booleanToArrow[JSON.parse(localStorage.getItem('displayTeam' + 2))]} size='large' /></button>
                        // eslint-disable-next-line indent
                        : <button className="teams" type="submit" onClick={() => { changeActive(3) }}>TEAM {index}<Icon name={booleanToArrow[JSON.parse(localStorage.getItem('displayTeam' + 3))]} size='large' /></button>
                        // eslint-disable-next-line indent
                      )
                  }
                </div>
                <li key={patient.id}>
                  <div id="linkList">
                    <Link to={{
                      pathname: `/patient/${patient.id}`,
                      state: { patients: patient, triageColor: triageColors[patient.triageLevel - 1], lastChecked: patient.lastChecked }
                    }}>
                      {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
                      <h3 key={patient.id + '.timeChecked'} className='medium' style={{ backgroundColor: triageColors[patient.triageLevel - 1] }}><TriageTimeLeft triageLevel={patient.triageLevel} lastChecked={patient.lastChecked} /></h3>
                      <h3 className='long'>{patient.reason}</h3>
                      <h3 className='long'>{patient.name}</h3>
                      <h3 className='long'>{patient.SSN}</h3>
                      <h3 className='short'>{patient.arrival}</h3>
                      <h3 className='short'>{patient.room}</h3>
                    </Link>
                  </div>
                  <a className='nav-link' href='/home' id='profilePicture'>
                    {
                      JSON.parse(localStorage.getItem('patient' + patient.id)) === true
                        ? <img src={checkboxselected} className='trends' alt='Not found' onClick={() => { handleChange(patient.id) }} />
                        : <img src={checkbox} className='trends' alt='Not found' onClick={() => { handleChange(patient.id) }} />
                    }
                  </a>
                </li>
              </>
            )
          } else {
            return (
              <>
                <div className="divideContainer">
                  {
                    index === 1
                      ? <button className="teams" type="submit" onClick={() => { changeActive(1) }}>TEAM {index}<Icon name={booleanToArrow[JSON.parse(localStorage.getItem('displayTeam' + 1))]} size='large' /></button>
                      : (index === 2
                        // eslint-disable-next-line indent
                        ? <button className="teams" type="submit" onClick={() => { changeActive(2) }}>TEAM {index}<Icon name={booleanToArrow[JSON.parse(localStorage.getItem('displayTeam' + 2))]} size='large' /></button>
                        // eslint-disable-next-line indent
                        : <button className="teams" type="submit" onClick={() => { changeActive(3) }}>TEAM {index}<Icon name={booleanToArrow[JSON.parse(localStorage.getItem('displayTeam' + 3))]} size='large' /></button>
                        // eslint-disable-next-line indent
                      )
                  }
                </div>
                <div>
                  <h1 className="spacer">Easter egg</h1>
                </div>
              </>
            )
          }
        } else {
          if (JSON.parse(localStorage.getItem('displayTeam' + patient.team)) === true) {
            return (
              <li key={patient.id}>
                <div id="linkList">
                  <Link to={{
                    pathname: `/patient/${patient.id}`,
                    state: { patients: patient, triageColor: triageColors[patient.triageLevel - 1], lastChecked: patient.lastChecked }
                  }}>
                    {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
                    <h3 key={patient.id + '.timeChecked'} className='medium' style={{ backgroundColor: triageColors[patient.triageLevel - 1] }}><TriageTimeLeft triageLevel={patient.triageLevel} lastChecked={patient.lastChecked} /></h3>
                    <h3 className='long'>{patient.reason}</h3>
                    <h3 className='long'>{patient.name}</h3>
                    <h3 className='long'>{patient.SSN}</h3>
                    <h3 className='short'>{patient.arrival}</h3>
                    <h3 className='short'>{patient.room}</h3>
                  </Link>
                </div>
                <a className='nav-link' href='/home' id='profilePicture'>
                  {
                    JSON.parse(localStorage.getItem('patient' + patient.id)) === true
                      ? <img src={checkboxselected} className='trends' alt='Not found' onClick={() => { handleChange(patient.id) }} />
                      : <img src={checkbox} className='trends' alt='Not found' onClick={() => { handleChange(patient.id) }} />
                  }
                </a>
              </li>
            )
          } else {
            return (
              <></>
            )
          }
        }
      })}
    </ul>
  )
}

export default PatientNavList
