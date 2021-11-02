/**
 *  Component for the "Aktuella händelser" on patient page.
 *  Adding tabs into the Aktuelle as part of user story 76
 *  WIP
 *
 *  Author Nikil
 */
import React from 'react'
import { Tab, Icon } from 'semantic-ui-react'

<Icon name='address book' />
const panes = [
  { menuItem: { icon: 'address card outline' }, render: () => <Tab.Pane>Tab 1 Content </Tab.Pane> },
  { menuItem: { icon: 'envelope' }, render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: { icon: 'location arrow' }, render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
]

const AktuellaTab = () => <Tab panes={panes} />

export default AktuellaTab
