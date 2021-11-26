/**
 * Component for the refresh of page in 30 seconds
 *
 * Nikil
 */
import React from 'react'

setTimeout(function () {
  window.location.href = window.location
}, 900000)

export default function Refresher () {
  return (
      <button onClick={setTimeout}></button>
  )
}
