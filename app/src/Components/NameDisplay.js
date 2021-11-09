/**
 * NameDisplay.js
 *
 * A component to always display Name and personal number of the patients - Nikil johny - DRAFT
 *
 * Documentation not complete.
 *
 * We have defined two variables to store the name and personal number
 * and displayed it accordingly.
 * function NameDisplay() - Nikil
 */

import React from 'react'
import { Message, Icon } from 'semantic-ui-react'

// function to display the information.
// Now takes in patient as prop from Patient.js, The two data constants are deleted /erik
const NameDisplay = ({ patient }) => (
  <>
    <div>
      <Message visible color='red'>
        {patient.name} , {patient.SSN} , Sökorsak :{' '}
        <Icon disabled name='search plus' />
        {patient.reasonForVisit}
      </Message>
    </div>
  </>
)

export default NameDisplay
