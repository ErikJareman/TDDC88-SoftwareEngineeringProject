import "./Patient.css";
import NameDisplay from "../../Components/NameDisplay";
import ReasonForVisit from "../../Components/ReasonForVisit";
import { useLocation, Link } from "react-router-dom";

export default function Patient() {
  const { state } = useLocation();

  return (
    <>
      <NameDisplay patient={state.patients} />
      <div>
        <h2>Patient ID: {state.patients.id}</h2>
        <Link to="/">
          <button style={{ backgroundColor: "lightGrey" }}>
            Back to patient list
          </button>
        </Link>
        <ReasonForVisit />
      </div>
    </>
  );
}
