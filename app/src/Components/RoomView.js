/**
 *RoomView.js
 *
 * A component to always display Name of the room under which the patient is currently in - Nikil johny - DRAFT
 *
 * Documentation not complete.
 *
 * We will just view the data using the state.
 * function RoomView() - Nikil
 */

import React from 'react'
import { useLocation } from 'react-router-dom'

export default function RoomView () {
  const { state } = useLocation()
  return (
    <div>
      <h5>Room : {state.patients.room}</h5>
    </div>
  )
}
