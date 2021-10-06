/**
 * PatientNavList.js
 *
 * function PatientNavList() - Philip Nylén - DRAFT
 */
import "./PatientNavList.css";
import { Link } from "react-router-dom";
import trends from "../assets/trends.png";
import notificationBell from "../assets/notificationBell.png";

/**
 * The function PatientNavList renders the list of patients, currently
 * only psuedo-data and hard-coded
 * Philip Nylén
 * FIXING
 */
export default function PatientNavList() {
  var person1 = ({
    timer: "00:15",
    arrival: "13:15",
    id: 190111138844,
    name: "Fredrik Olsson",
    reasonForVisit: "Benbrott",
    team: "A",
    room: 1
  });
  var person2 = ({
    timer: "05:34",
    arrival: "14:27",
    id: 200001012233,
    name: "Karl Boström",
    reasonForVisit: "Buksmärtor",
    team: "B",
    room: 5
  });

  return (
    <nav>
      <ul>
        <li>
          <Link to={{pathname: "/patient/" + person1.id}}>
              <table>
                <h3 class="medium">
                  {person1.timer}
                </h3>
                <h3>
                  {person1.arrival}
                </h3>
                <h3 class="long">
                  {person1.name}
                </h3>
                <h3 class="long">
                  {person1.id}
                </h3>
                <h3 class="long">
                  {person1.reasonForVisit}
                </h3>
                <h3>
                  {person1.team}
                </h3>
                <h3>
                  {person1.room}
                </h3>
              </table>
            </Link>
            <a class="nav-link" href="#" id="profilePicture">
              <img src={trends} className="trends" alt="Not found" />
            </a>
            <a class="nav-link" href="#" id="profilePicture">
              <img src={notificationBell} className="notificationBell" alt="Not found" />
            </a>
        </li>
        <li>
          <Link to={{pathname: "/patient/" + person2.id}}>
            <table>
              <h3 class="medium">
                {person2.timer}
              </h3>
              <h3>
                {person2.arrival}
              </h3>
              <h3 class="long">
                {person2.name}
              </h3>
              <h3 class="long">
                {person2.id}
              </h3>
              <h3 class="long">
                {person2.reasonForVisit}
              </h3>
              <h3>
                {person2.team}
              </h3>
              <h3>
                {person2.room}
              </h3>
            </table>
          </Link>
          <a class="nav-link" href="#" id="profilePicture">
            <img src={trends} className="trends" alt="Not found" />
          </a>
          <a class="nav-link" href="#" id="profilePicture">
            <img src={notificationBell} className="notificationBell" alt="Not found" />
          </a>
        </li>
      </ul>
    </nav>
  );
}