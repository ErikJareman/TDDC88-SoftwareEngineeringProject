import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Patient from "./Pages/Patient/Patient";
import Login from "./Pages/Login/Login";
import "semantic-ui-css/semantic.min.css";
import HeaderField from "./Components/HeaderField";
import "semantic-ui-css/semantic.min.css";

export default function App() {
  return (
    <>
      <HeaderField />
      <Router>
        <div className="App">
          <Switch>
            <Route path="/patient" component={Patient} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </>
  );
}
