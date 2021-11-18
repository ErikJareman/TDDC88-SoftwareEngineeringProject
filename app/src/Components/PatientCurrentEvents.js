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
  const panes = [
    {
      menuItem: { icon: 'newspaper outline big' },
      render: () => <Tab.Pane>{FilterEvents({ sortBy: 'time', list: currentEvents }).map((event) => {
        return (<EventCard event={event} key={event.category + '_' + event.time} name={event.type} time={event.time} color='green' image={event.categories} />)
      })}</Tab.Pane>
    },
    {
      menuItem: { icon: 'envelope outline big' },
      render: () => <Tab.Pane>{FilterEvents({ sortBy: 'time', filterBy: 'incoming', list: currentEvents }).map((event) => {
        return (<EventCard event={event} key={event.category + '_' + event.time} name={event.type} time={event.time} color='green' image={event.categories} />)
      })} </Tab.Pane>
    },
    {
      menuItem: { icon: 'location arrow big' },
      render: () => <Tab.Pane>{FilterEvents({ sortBy: 'time', filterBy: 'outgoing', list: currentEvents }).map((event) => {
        return (<EventCard event={event} key={event.category + '_' + event.time} name={event.type} time={event.time} color='green' image={event.categories} />)
      })} </Tab.Pane>
    }
  ]
  return (
    <div>
      <Tab panes={panes} />
    </div>
  )
}

export default PatientCurrentEvents
