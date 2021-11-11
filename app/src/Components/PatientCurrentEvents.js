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
import SortAndFilterEvents from './SortAndFilterEvents'

function PatientCurrentEvents (props) {
  const panes = [
    {
      menuItem: { icon: 'newspaper outline big' }, render: () => <Tab.Pane>{<SortAndFilterEvents sortBy={'time'} filterBy={'hej'} events={props.cards} />}</Tab.Pane>
    },
    {
      menuItem: { icon: 'envelope  big' }, render: () => <Tab.Pane>{props.cards[1]}{props.cards[2]} </Tab.Pane>
    },
    {
      menuItem: { icon: 'location arrow big' }, render: () => <Tab.Pane>{props.cards[3]} </Tab.Pane>
    }
  ]
  return (
    <div>
      <Tab panes={panes} />
    </div>
  )
}

export default PatientCurrentEvents
