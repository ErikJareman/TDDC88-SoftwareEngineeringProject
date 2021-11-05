/**
 *  Component for the "Patientinfo"-box on patient page. 
 * 
 *  WIP
 * 
 *  Author David Råsberg
 */

import "./PatientInfo.css"
import TriageTimeLeft from './TriageTimeLeft';
import ReasonForVisit from "./ReasonForVisit";
import { Icon } from 'semantic-ui-react';

export default function PatientInfo(patient) {
    return (
        <div className="PatientInfo-div">
            <h1> Patientinfo  </h1>
            <h5><Icon name='user' />{patient.patient.name}, {patient.patient.pnum}</h5>
            <h5><Icon name='clock' /> <TriageTimeLeft timeChecked={patient.patient}/></h5>
            <h5><Icon name='address book' /> ISS: </h5>
            <h5><Icon name='ambulance' /> Ambulans </h5>
            <ReasonForVisit />
        </div>
    );
};