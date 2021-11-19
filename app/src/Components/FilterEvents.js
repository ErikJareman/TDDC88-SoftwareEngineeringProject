/**
 *  Component to filter and/or sort the current events on patient page.
 *
 *
 *  Done by David
 *
 * Currently only works for time: 'HH:MM:SS...'. Not Date type
 *
 *  WIP
 */

// takes a dictionary as parameter. With {sortBy='', filterBy=''}
// Where:
//       'sortBy' (optional) = field in list to sort by
//       'filterField' (optional) = field in list to filter by
//        'filterBy' = value field should equal

export default function FilterEvents () {
  function compareTime (a, b, i) {
    if (b[i] === a[i] & i < a.length) {
      return compareTime(a, b, i + 1)
    } else {
      return (b[i] - a[i])
    }
  }

  const [props] = [...arguments]
  const [filterField, filterBy, sortBy, list] = [props.filterField, props.filterBy, props.sortBy, props.list]
  let sortedEvents = list
  // console.log('filterField,', filterField, 'filterBy', filterBy, 'sortBy', sortBy, 'list', list)

  if (sortedEvents.length > 0) {
    if (filterField !== undefined) {
      sortedEvents = sortedEvents.filter((event) => {
        return event[filterField] === filterBy
      })
    }
    if (sortBy !== undefined || list.length > 1) {
      if (sortBy === 'time' || sortBy === 'timein') {
        sortedEvents.sort(function (a, b) {
          const aTime = a[sortBy].split(':')
          const bTime = b[sortBy].split(':')
          return compareTime(aTime, bTime, 0)
        })
      }
    }
  }
  return sortedEvents
}
