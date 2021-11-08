/**
 *  Component for the "Aktuella händelser" on patient page.
 *
 *  WIP
 *
 *  Author David Råsberg
 *
 *  Adding tabs into the Aktuelle as part of user story
 *  Done by Nikil
 */
import React from 'react'
import { Tab } from 'semantic-ui-react'

function PatientCurrentEvents (props) {
  const panes = [
    {
      menuItem: { icon: 'address card outline' }, render: () => <Tab.Pane>{props.cards[0]}</Tab.Pane>
    },
    {
      menuItem: { icon: 'envelope' }, render: () => <Tab.Pane>{props.cards[1]}{props.cards[2]} </Tab.Pane>
    },
    {
      menuItem: { icon: 'location arrow' }, render: () => <Tab.Pane>{props.cards[3]} </Tab.Pane>
    }
  ]
  return (
    <div>
      <Tab panes={panes} />
    </div>
  )
}

export default PatientCurrentEvents
