/**
 * PatientNavList.js
 *
 * function PatientNavList() - Philip Nylén, Erik Jareman - DRAFT
 */
import './PatientInUt.css'
//  import { Link } from 'react-router-dom'
//  import trends from '../assets/trends.png'
//  import notificationBell from '../assets/notificationBell.png'
import React from 'react'

/**
 * The function PatientNavList renders the list of patients, currently
 * only psuedo-data
 * Philip Nylén, Erik Jareman
 * FIXING
 */
export default function PatientInUt () {
  const intravenousInjection = [
    {
      id: '1',
      type: 'PVK',
      size: 1.3,
      locatization: 'Vänster/arm',
      time: '05:34'
    }, {
      id: '2',
      type: 'CKB',
      size: 2.3,
      locatization: 'Höger/ben',
      time: '14:38'
    }
  ]

  return (
    <ul className ="inUt">
      {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
      <li>
      <table>
      <h3 className='table-long'> Typ</h3>
      <h3 className='table-long'>Storlek</h3>
      <h3 className='table-long'>Lokalisation</h3>
      <h3 className='table-long'>Tid</h3>
      </table>
      </li>
      {intravenousInjection.map((injection) => {
        return (
          <li key={injection.id}>
            <table>
              {/* Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3> */}
              <h3 className='table-long'>{injection.type}</h3>
              <h3 className='table-long'>{injection.size}</h3>
              <h3 className='table-long'>{injection.locatization}</h3>
              <h3 className='table-long'>{injection.time}</h3>
            </table>
          </li>
        )
      })}
    </ul>
  )
}
