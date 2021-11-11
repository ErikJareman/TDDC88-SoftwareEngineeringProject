/**
 *  Component to filter and/or sort the current events on patient page.
 *
 *  WIP
 *
 *  Done by David
 */
// import React from 'react'

export default function SortAndFilterEvents (props) {
  const vars = [props]
  if ('filterBy' in vars) {
    console.log(vars)
  }
  const eventsArray = props.events
  /* const sortBy = props.sortBy
  const filterBy = props.filterBy */
  return eventsArray
}
