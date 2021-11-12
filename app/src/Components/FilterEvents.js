/**
 *  Component to filter and/or sort the current events on patient page.
 *
 *  WIP
 *
 *  Done by David
 */
import { useEffect } from 'react'
import axios from 'axios'

export default function FilterEvents (props) {
  const [id, filterBy, sortBy] = [props.id, props.filterBy, props.sortBy]
  console.log(filterBy)

  let sortedEvents = []

  useEffect(() => {
    axios.get('https://backend-c4company.herokuapp.com/patients/' + id + '/vitals')
      .then(res => {
        console.log(res.data)
        sortedEvents = res.data.filter((event) => {
          return event.type === filterBy
        })
        console.log(sortedEvents)
      })
  }, [])

  if (sortBy === undefined) {
    console.log('sortBy not in props')
  }

  return 'hej'
}
