/**
 *  Component to filter and/or sort the current events on patient page.
 *
 *  WIP
 *
 *  Done by David
 */
import axios from 'axios'

export default function FilterEvents (props) {
  const [id, type, filterBy, sortBy] = [props.id, props.type, props.filterBy, props.sortBy]
  // console.log(filterBy)

  let sortedEvents = []

  axios.get('https://backend-c4company.herokuapp.com/patients/' + id + '/' + type)
    .then(res => {
      console.log(res.data)
      if (filterBy !== undefined) {
        sortedEvents = res.data.filter((event) => {
          return event.type === filterBy
        })
      }
      console.log(...sortedEvents)
    })

  if (sortBy === undefined) {
    console.log('sortBy not in props')
  }

  return 'hej'
}
