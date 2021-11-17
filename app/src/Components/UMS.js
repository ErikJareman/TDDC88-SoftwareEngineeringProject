/** Component for rendering the UMS logo which is supposed to show some of the patients
 * previous medical history. Now fully linked with the backend database.
 *
 * FINISHED
 * Author: Philip Löfgren
 *
 * Bugfix by Philip Nylén 17/11 - bypassing race condition by utilizing local storage
 *
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
  const [UMS, setUMS] = useState([])

  useEffect(() => {
    axios.get('https://backend-c4company.herokuapp.com/patients/' + props.patient.patient.id + '/ums')
      .then(res => {
        const temp = res.data
        setUMS(temp)
        localStorage.setItem('UMS', JSON.stringify(temp))
      })
  }, [])

  const modifyUMS = () => {
    let details = 0
    if (UMS[0] === undefined) {
      details = JSON.parse(localStorage.getItem('UMS'))
    } else {
      details = UMS
    }
    if (details[0].sensLevel === 1) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('oversens1').setAttributeNS(null, 'fill', 'red')
    } else if (details[0].sensLevel === 2) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('oversens1').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens2-1').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens2-2').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens2-3').setAttributeNS(null, 'fill', 'red')
    } else if (details[0].sensLevel === 3) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('oversens1').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens2-1').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens2-2').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens2-3').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens3').setAttributeNS(null, 'fill', 'red')
    }
    if (details[0].medCondition) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('medCondition').setAttributeNS(null, 'fill', 'red')
    }
    if (details[0].careDeviation) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('careDeviation').setAttributeNS(null, 'fill', 'blue')
    }
    if (details[0].infection) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('infection').setAttributeNS(null, 'fill', 'yellow')
    }
    if (details[0].noStructureInfo) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('noStructureInfo').setAttributeNS(null, 'fill', 'red')
    }
  }
  return (
    <object className='UMS-logo' onLoad={modifyUMS} id="svg-object" data={umsLogo} type="image/svg+xml"></object>
  )
}
