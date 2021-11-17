/**
 *  Component to filter and/or sort the current events on patient page.
 *
 *  WIP
 *
 *  Done by David
 */

// takes a dictionary as parameter. With {sortBy='', filterBy=''}
// Where; 'type' = request route path after '.../patient_id/'
//       'sortBy' (optional) = field in request result to sort by
//       'filterBy' (optional) = type to filter request array by
export default function FilterEvents () {
  function compareTime (a, b, i) {
    if (b[i] === a[i] & i !== 3) {
      return compareTime(a, b, i + 1)
    } else {
      return (b[i] - a[i])
    }
  }

  const [props] = [...arguments]
  const [filterBy, sortBy, list] = [props.filterBy, props.sortBy, props.list]
  const sortedEvents = list
  if (filterBy !== undefined) {
    console.log(filterBy)
    /* sortedEvents = sortedEvents.filter((event) => {
      return event.type === filterBy
    }) */
  }
  if (sortBy !== undefined) {
    sortedEvents.sort(function (a, b) {
      const aTime = a[sortBy].split(':')
      const bTime = b[sortBy].split(':')
      return compareTime(aTime, bTime, 0)
    })
  }

  console.log(sortedEvents)
  return sortedEvents
}
