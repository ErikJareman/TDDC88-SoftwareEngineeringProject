/**
 * NameDisplay.js
 *
 * A component to always display Name and personal number of the patients - Nikil johny - FINAL
 *
 * We have defined two variables to store the name and personal number
 * and displayed it accordingly.
 * function NameDisplay() - Nikil
 */

import React from 'react'
import './NameDisplay.css'

// function to display the information.
// Now takes in patient as prop from Patient.js, The two data constants are deleted /erik
const NameDisplay = ({ patient }) => (
  <>
    <div id="subheader" >
      <h1 id="subheaderText">
        {patient.name} , {patient.SSN}
        {patient.reasonForVisit}
      </h1>
    </div>
    <div id="subheaderRight">
      <h1 id="subheaderTextright">
        Team {patient.team}, Rum {patient.room}
      </h1>
    </div>

  </>
)

export default NameDisplay
