import React from 'react'
import { Table } from 'semantic-ui-react'
// import axios from 'axios'

function GetVitalData (props) {
  return ([
    {
      Value: 85,
      Time: '12:03'
    },
    {
      Value: 83,
      Time: '11:52'
    },
    {
      Value: 86,
      Time: '11:25'
    },
    {
      Value: 84,
      Time: '11:19'
    }
  ]
  )
}

function MakeTableRow (event) {
  return (
        <Table.Row>
            <Table.Cell textAlign='center'><b>{event.Value}</b></Table.Cell>
            <Table.Cell textAlign='center'><b>{event.Time}</b></Table.Cell>
        </Table.Row>
  )
}

/**
 * creates the full component by mapping over patient-data from backend and applying the generateSegment-function.
 */
const VitalHistory = (props) => (

        <Table stackable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign='center'><b>{props.type}</b></Table.HeaderCell>
                    <Table.HeaderCell ></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            {GetVitalData(props).map(MakeTableRow)}

        </Table>

)

export default VitalHistory
