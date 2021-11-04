import './EventCard.css'
import React, { Component } from 'react'
import homeImage from '../assets/home.png'

class EventCard extends Component {
  render () {
    return (
      <>
        <table id='patient-inlagd-group'>
          <tr>
            <th><div id='rectangle'></div></th>
            <th><h4>{this.props.name}</h4></th>
            <th><img src={homeImage} id='shape'></img></th>
            <th><h4>{this.props.time}</h4></th>
          </tr>
        </table>
      </>
    )
  }
}

export default EventCard
