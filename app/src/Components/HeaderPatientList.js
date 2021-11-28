
/*
A component to display the patient details tab in the home page
- Nikil

*/
import React from 'react'
import './HeaderPatientList.css'

export default function HeaderPatientList () {
  return (
    <div id="headerContainer">
      <div id="headersubArea1">
        <button className="mediumEntity">Timer</button>
        <button className="longEntity">Sökorsak</button>
        <button className="longEntity">Namn</button>
        <button className="longEntity">Personnummer</button>
        <button className="shortEntity">Ankomst</button>
        <button className="shortEntity">Rum</button>
        <button className="shortEntity">Notis</button>
      </div>
    </div>
  )
}
