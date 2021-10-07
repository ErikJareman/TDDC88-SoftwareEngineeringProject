import "./Patient.css";
import NameDisplay from "../../Components/NameDisplay";
import ReasonForVisit from "../../Components/ReasonForVisit";

export default function Patient() {
  return (
    <>
    <NameDisplay />
    <div>
      <h1>This is the patient page!</h1>
      <ReasonForVisit />
    </div>
    </>
  );
}
