/**
 * Component for the vital parameters on the patient page.
 * Isak Berntsson & Linus Bäckbro Kuusisto
 */
import React from 'react'
import { Segment } from 'semantic-ui-react'

function getVitalValues(patientID) {
    // this should be ajax call to backend in future
    const vitals = [
        {
            type: 'Pulse',
            time: '12:00',
            values: '109'
        },
        {
            type: 'Pulse',
            time: '12:00',
            values: '109'
        },
    ]
    return vitals
}

function VitalsDimension(value) {
    return <Segment><strong>{value.type}</strong>       <strong>{value.value}</strong> </Segment>
}

export default function VitalValues() {
    return <div>{VitalsDimension(getVitalValues(123))[0]}</div>
}
