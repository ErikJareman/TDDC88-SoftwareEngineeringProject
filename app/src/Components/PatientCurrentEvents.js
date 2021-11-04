/**
 *  Component for the "Aktuella händelser" on patient page.
 *
 *  WIP
 *
 *  Author David Råsberg
 */
import React from 'react'
import EventCard from './EventCard'

export default function PatientCurrentEvents () {
  return (
    <div>
      <EventCard name='Medicin ordination' time='17.00' color='blue' />
      <EventCard name='Smörgås och saft' time='15.40' color='green' />
      <EventCard name='Medicin dosering' time='13.38' color='green' />
      <EventCard name='Patient inlagd' time='13.00' color='blue' />
    </div>
  )
}
