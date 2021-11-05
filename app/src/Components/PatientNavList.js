/**
 * PatientNavList.js
 *
 * function PatientNavList() - Philip Nylén, Erik Jareman - DRAFT
 */
import "./PatientNavList.css";
import { Link } from "react-router-dom";
import trends from "../assets/trends.png";
import notificationBell from "../assets/notificationBell.png";
import TriageTimeLeft from "./TriageTimeLeft";

/**
 * The function PatientNavList renders the list of patients, currently
 * only psuedo-data
 * Philip Nylén, Erik Jareman
 * FIXING
 */
export default function PatientNavList() {
  const patients = [
    {
      id: 1,
      name: "Fredrik Olsson",
      pnum: "930217-5150",
      timer: "00:15",
      arrival: "13:15",
      reasonForVisit: "Benbrott",
      team: "A",
      room: 1,
      timeChecked: Date.now() - 120 * 1000, //current time - 2 minutes. Arbitrary somewhat recent time patient was last checked. Temporary...
      triage: "red"
    },
    {
      id: 2,
      name: "Karl Boström",
      pnum: "870427-0227",
      timer: "05:34",
      arrival: "14:27",
      reasonForVisit: "Buksmärtor",
      team: "B",
      room: 5,
      timeChecked: Date.now() - 270 * 1000, //current time - 4.5 minutes. Arbitrary somewhat recent time patient was last checked. Temporary...
      triage: "yellow"
    },
  ];

  return (
    <ul>
      {patients.map((patient) => {
        return (
          <li key={patient.id}>
            <Link
              to={{
                pathname: `/patient/${patient.id}`,
                state: { patients: patient },
              }}
            >
              <table>
                {/*Children in order <table> --> <thead> --> <tr> --> <td> to avoid warning, not <table> --> <h3>*/}
                <h3 className="medium" style={{ backgroundColor: patient.triage }}><TriageTimeLeft timeChecked={patient}/></h3> 
                <h3>{patient.arrival}</h3>
                <h3 className="long">{patient.name}</h3>
                <h3 className="long">{patient.id}</h3>
                <h3 className="long">{patient.reasonForVisit}</h3>
                <h3>{patient.team}</h3>
                <h3>{patient.room}</h3>
              </table>
            </Link>
            <a className="nav-link" href="/" id="profilePicture">
              <img src={trends} className="trends" alt="Not found" />
            </a>
            <a className="nav-link" href="/" id="profilePicture">
              <img
                src={notificationBell}
                className="notificationBell"
                alt="Not found"
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
