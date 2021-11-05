/**
 * ReasonForVisit.js
 *
 * A component to display the reason why the patient is in the hospital.
 * We use segments from the semantic Ui libaray so that it takes only as much space
 * as is necessary.
 * We have also used Icon for displaying the search icon.
 * Documentation not complete.
 *
 * We have defined one variables to store the complete description reason as string.
 * and displayed it accordingly.
 * function ReasonForVisit() - Nikil
 */
import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'

// Variable for storing the reason for visit.
const Reason = 'I am having fever and headache...'

// function for displaying the information.
const ReasonForVisit = () =>
<>
    <h5>Aktuellt händelseförlopp<Icon disabled name='search plus' /></h5>
    <Segment compact>{Reason}</Segment>
</>
export default ReasonForVisit
