/**
 *  Component for the "Aktuella händelser" on patient page.
 *
 *  WIP
 *
 *
 *  Adding tabs into the Aktuelle as part of user story
 *  Done by Nikil
 */
import React from 'react'
import { Tab } from 'semantic-ui-react'
import FilterEvents from './FilterEvents'
import EventCard from './EventCard'

function PatientCurrentEvents (props) {
  const currentEvents = props.currentEvents
  let incoming = props.currentEvents
  let outgoing = props.currentEvents
  incoming = FilterEvents({ sortBy: 'time', list: incoming, filterField: 'sent', filterBy: false })
  outgoing = FilterEvents({ sortBy: 'time', list: outgoing, filterField: 'sent', filterBy: true })

  console.log(incoming, outgoing)

  const panes = [
    {
      menuItem: { icon: 'newspaper outline big' },
      render: () => <Tab.Pane>{FilterEvents({ sortBy: 'time', list: currentEvents }).map((event) => {
        return (<EventCard event={event} key={event.category + '_' + event.time} name={event.type} time={event.time} color='green' image={event.category} />)
      })}</Tab.Pane>
    },
    {
      menuItem: { icon: 'envelope outline big' },
      render: () => <Tab.Pane>{incoming.map((event) => {
        return (<EventCard event={event} key={event.category + '_' + event.time} name={event.type} time={event.time} color='green' image={event.category} />)
      })}</Tab.Pane>
    },
    {
      menuItem: { icon: 'location arrow big' },
      render: () => <Tab.Pane>{outgoing.map((event) => {
        return (<EventCard event={event} key={event.category + '_' + event.time} name={event.type} time={event.time} color='green' image={event.category} />)
      })}</Tab.Pane>
    }
  ]

  return (
    <div>
      <Tab panes={panes} />
    </div>
  )
}

export default PatientCurrentEvents
