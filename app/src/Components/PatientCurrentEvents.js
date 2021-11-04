/**
 *  Component for the "Aktuella händelser" on patient page.
 *
 *  WIP
 *
 *  Author David Råsberg
 *
 *  Adding tabs into the Aktuelle as part of user story
 *  Done by Nikil
 */
import React from 'react'
import AktuellaTab from './AktuellaTab'

export default function PatientCurrentEvents (patient) {
  return (
    <>
    <div>
      <AktuellaTab />
    </div>
    </>
  )
}
