/**
 *  Component for the "Aktuella händelser" on patient page.
 *  Adding tabs into the Aktuelle as part of user story 76
 *  WIP
 *
 *  Author Nikil
 */
import React from 'react'
import { Tab } from 'semantic-ui-react'
import EventCard from './EventCard'

const panes = [
  { menuItem: { icon: 'address card outline' }, render: () => <Tab.Pane>Tab 1 Content </Tab.Pane> },
  { menuItem: { icon: 'envelope' }, render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: { icon: 'location arrow' }, render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
]

const AktuellaTab = () => <Tab panes={panes} />

export default AktuellaTab() {
  return (
    <>
      <div>
        <EventCard name='Medicin ordination' time='17.00' color='blue' image='portal' />
        <EventCard name='Smörgås och saft' time='15.40' color='green' image='firstAid' />
        <EventCard name='Medicin dosering' time='13.38' color='green' image='accessability' />
        <EventCard name='Patient inlagd' time='13.00' color='blue' image='firstAid' />
      </div>
    </>
  )
}
