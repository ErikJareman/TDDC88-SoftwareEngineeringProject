/**
 * Component for the refresh of page in 30 seconds
 *
 * Nikil
 * 
 * FINAL
 */
import React from 'react'

setTimeout(function () {
  window.location.href = window.location
}, 30000)

export default function Refresher () {
  return (
      <button onClick={setTimeout}></button>
  )
}
