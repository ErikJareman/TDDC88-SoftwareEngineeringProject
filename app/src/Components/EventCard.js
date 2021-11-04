import './EventCard.css'
import React, { Component } from 'react'
import homeImage from '../assets/home.png'
import portalImage from '../assets/portal.png'
import firstAidImage from '../assets/first_aid.png'
import accessabilityImage from '../assets/accessability.png'

class EventCard extends Component {
  render () {
    const imgMap = new Map()
    imgMap.set('home', homeImage)
    imgMap.set('portal', portalImage)
    imgMap.set('firstAid', firstAidImage)
    imgMap.set('accessability', accessabilityImage)
    return (
      <>
        <table id='patient-inlagd-group'>
          <tr>
            <th><div style={{ backgroundColor: this.props.color }} id='rectangle'></div></th>
            <th><h4>{this.props.name}</h4></th>
            <th><img src={imgMap.get(this.props.image)} id='shape'></img></th>
            <th><h4>{this.props.time}</h4></th>
          </tr>
        </table>
      </>
    )
  }
}

export default EventCard
