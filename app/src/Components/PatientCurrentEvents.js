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
      <EventCard name='Test' time='15.40' />
      <EventCard name='Test2' time='14.30' />
    </div>
  )
}
