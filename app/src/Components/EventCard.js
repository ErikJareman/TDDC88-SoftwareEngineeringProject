import './EventCard.css'
import React from 'react'
import homeImage from '../assets/home.png'

export default function EventCard () {
  return (
    <>
      <table id='patient-inlagd-group'>
        <tr>
          <th><div style='background-color: red;' id='rectangle'></div></th>
          <th><h4>Ankomst</h4></th>
          <th><img src={homeImage} id='shape'></img></th>
          <th><h4>15.40</h4></th>
        </tr>
      </table>
    </>
  )
}
