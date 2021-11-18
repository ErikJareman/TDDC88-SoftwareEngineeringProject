import './EventCard.css'
import React from 'react'
import homeImage from '../assets/home.png'
import portalImage from '../assets/portal.png'
import firstAidImage from '../assets/first_aid.png'
import accessabilityImage from '../assets/accessability.png'

function EventCard (props) {
  const imgMap = new Map()
  imgMap.set('home', homeImage)
  imgMap.set('portal', portalImage)
  imgMap.set('firstAid', firstAidImage)
  imgMap.set('accessability', accessabilityImage)
  return (
      <table id='patient-inlagd-group'>
        <tr>
         <th><img src={imgMap.get(props.image)} id='shape'></img></th>
         <th><h4>{props.name}</h4></th>
         <th><h4>{props.time}</h4></th>
        </tr>
      </table>
  )
}
export default EventCard
