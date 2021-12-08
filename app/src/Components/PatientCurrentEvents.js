/**
 * Component for the "Aktuella händelser" on patient page.
 *
 * Adding tabs into the Aktuella as part of user story
 * Done by Nikil & Philip N
 * 
 * FINAL
 */
import React from 'react'
import { Tab } from 'semantic-ui-react'
import FilterEvents from './FilterEvents'
import EventCard from './EventCard'
import './PatientCurrentEvents.css'
import Current from '../assets/current2.png'

function PatientCurrentEvents (props) {
  const currentEvents = props.currentEvents
  let incoming = props.currentEvents
  let outgoing = props.currentEvents
  incoming = FilterEvents({ sortBy: 'time', list: incoming, filterField: 'sent', filterBy: false })
  outgoing = FilterEvents({ sortBy: 'time', list: outgoing, filterField: 'sent', filterBy: true })
  const eventTabsCss = {
    width: '100%',
    height: '40vh',
    overflow: 'hidden',
    overflowY: 'auto',
    padding: '2px',
    backgroundColor: '#f7f7f7',
    borderRadius: '5px'
  }
  const CustomIcon = (
    <i className="tabIcon">
      <img id="tabImage" src={Current} />
    </i>
  )

  function imageToLoad (category) {
    let stringToReturn = category
    if (category === 'Gubbe') {
      stringToReturn = 'Inkommen'
    }
    return stringToReturn
  }

  const handleTabChange = (e, data) => {
    localStorage.setItem('activeEventIndex', data.activeIndex)
  }

  const panes = [
    {
      menuItem: { icon: CustomIcon },
      render: () => <Tab.Pane style={eventTabsCss}>{FilterEvents({ sortBy: 'time', list: currentEvents }).map((event) => {
        return (<EventCard event={event} key={event.category + '_' + event.time} name={event.type} time={event.time} color='green' image={imageToLoad(event.category)} />)
      })}</Tab.Pane>
    },
    {
      menuItem: { icon: 'envelope outline big' },
      render: () => <Tab.Pane style={eventTabsCss}>{incoming.map((event) => {
        return (<EventCard event={event} key={event.category + '_' + event.time} name={event.type} time={event.time} color='green' image={imageToLoad(event.category)} />)
      })}</Tab.Pane>
    },
    {
      menuItem: { icon: 'location arrow big' },
      render: () => <Tab.Pane style={eventTabsCss}>{outgoing.map((event) => {
        return (<EventCard event={event} key={event.category + '_' + event.time} name={event.type} time={event.time} color='green' image={event.category} />)
      })}</Tab.Pane>
    }
  ]

  return (
    <div>
      <Tab
        menu={{
          attached: true,
          tabular: true,
          style: { display: 'flex', justifyContent: 'center' }
        }}
        panes={panes}
        defaultActiveIndex={localStorage.getItem('activeEventIndex') || 0}
        onTabChange={handleTabChange} />
    </div>
  )
}

export default PatientCurrentEvents
