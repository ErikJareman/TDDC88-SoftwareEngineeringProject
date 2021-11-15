/** Component for rendering the UMS logo which is supposed some of the patients
 * previous medical history. Currently uses a mock patient to display the medical history.
 * CSS still needs some work. Also needs to be tweaked to be compatible with backend data.
 *
 * DRAFT
 * Author: Philip Löfgren
 */

import React from 'react'
import './UMS.css'
import umsLogo from '../assets/ums.svg'

/** Mock patient */
const testPatient = {
  id: 1,
  UMS: {
    sensLevel: 2,
    medCondition: true,
    careDeviation: true,
    infection: true,
    noStructureInfo: false
  }
}
/** The function UMS () modifies a svg file which will fill in different colors based
 * on the patients medical history. The colors are set based on a few booleans and also their level
 * of oversensitity which ranges from 0 to 3.
 */

export default function UMS () {
  const modifyUMS = () => {
    if (testPatient.UMS.sensLevel === 1) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('oversens1').setAttributeNS(null, 'fill', 'red')
    } else if (testPatient.UMS.sensLevel === 2) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('oversens1').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens2-1').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens2-2').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens2-3').setAttributeNS(null, 'fill', 'red')
    } else if (testPatient.UMS.sensLevel === 3) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('oversens1').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens2-1').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens2-2').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens2-3').setAttributeNS(null, 'fill', 'red')
      svgObject.getElementById('oversens3').setAttributeNS(null, 'fill', 'red')
    }
    if (testPatient.UMS.medCondition) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('medCondition').setAttributeNS(null, 'fill', 'red')
    }
    if (testPatient.UMS.careDeviation) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('careDeviation').setAttributeNS(null, 'fill', 'blue')
    }
    if (testPatient.UMS.infection) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('infection').setAttributeNS(null, 'fill', 'yellow')
    }
    if (testPatient.UMS.noStructureInfo) {
      const svgObject = document.getElementById('svg-object').contentDocument
      svgObject.getElementById('noStructureInfo').setAttributeNS(null, 'fill', 'red')
    }
  }
  return (
        <object className='UMS-logo' onLoad={modifyUMS} id="svg-object" data={umsLogo} type="image/svg+xml"></object>
  )
}
