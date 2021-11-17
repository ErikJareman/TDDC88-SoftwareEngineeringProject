/** Component for rendering the UMS logo which is supposed to show some of the patients
 * previous medical history. Now fully linked with the backend database.
 *
 * FINISHED
 * Author: Philip Löfgren
 */

import React, { useEffect, useState } from 'react'
import './UMS.css'
import umsLogo from '../assets/ums.svg'
import axios from 'axios'

/** The function UMS () modifies a svg file which will fill in different colors based
 * on the patients medical history. The colors are set based on a few booleans and also their level
 * of oversensitity which ranges from 0 to 3.
 */

export default function UMS (props) {
  console.log('1. Patient id: ' + props.patient.patient.id)
  const [isLoading, setLoading] = useState(true)
  const [UMS, setUMS] = useState([])

  useEffect(() => {
    console.log('2. Data sent in: ' + props.patient.patient.id)
    axios.get('https://backend-c4company.herokuapp.com/patients/' + props.patient.patient.id + '/ums')
      .then(res => {
        const temp = res.data
        console.log('3. THIS IS WHAT RENDERS: ' + temp[0].sensLevel)
        setUMS(temp)
        setLoading(false)
      })
  }, [])

  const modifyUMS = () => {
    console.log('4. Patient sensitivity: ')
    if (UMS[0] !== undefined) {
      console.log('5. ' + UMS[0].sensLevel)
      if (UMS[0].sensLevel === 1) {
        const svgObject = document.getElementById('svg-object').contentDocument
        svgObject.getElementById('oversens1').setAttributeNS(null, 'fill', 'red')
      } else if (UMS[0].sensLevel === 2) {
        const svgObject = document.getElementById('svg-object').contentDocument
        svgObject.getElementById('oversens1').setAttributeNS(null, 'fill', 'red')
        svgObject.getElementById('oversens2-1').setAttributeNS(null, 'fill', 'red')
        svgObject.getElementById('oversens2-2').setAttributeNS(null, 'fill', 'red')
        svgObject.getElementById('oversens2-3').setAttributeNS(null, 'fill', 'red')
      } else if (UMS[0].sensLevel === 3) {
        const svgObject = document.getElementById('svg-object').contentDocument
        svgObject.getElementById('oversens1').setAttributeNS(null, 'fill', 'red')
        svgObject.getElementById('oversens2-1').setAttributeNS(null, 'fill', 'red')
        svgObject.getElementById('oversens2-2').setAttributeNS(null, 'fill', 'red')
        svgObject.getElementById('oversens2-3').setAttributeNS(null, 'fill', 'red')
        svgObject.getElementById('oversens3').setAttributeNS(null, 'fill', 'red')
      }
      if (UMS[0].medCondition) {
        const svgObject = document.getElementById('svg-object').contentDocument
        svgObject.getElementById('medCondition').setAttributeNS(null, 'fill', 'red')
      }
      if (UMS[0].careDeviation) {
        const svgObject = document.getElementById('svg-object').contentDocument
        svgObject.getElementById('careDeviation').setAttributeNS(null, 'fill', 'blue')
      }
      if (UMS[0].infection) {
        const svgObject = document.getElementById('svg-object').contentDocument
        svgObject.getElementById('infection').setAttributeNS(null, 'fill', 'yellow')
      }
      if (UMS[0].noStructureInfo) {
        const svgObject = document.getElementById('svg-object').contentDocument
        svgObject.getElementById('noStructureInfo').setAttributeNS(null, 'fill', 'red')
      }
    }
  }
  return (
    <div>
    {
      isLoading === true
        ? <object className='UMS-logo' />
        : <object className='UMS-logo' onLoad={modifyUMS} id="svg-object" data={umsLogo} type="image/svg+xml"></object>
    }
    </div>
  )
}
